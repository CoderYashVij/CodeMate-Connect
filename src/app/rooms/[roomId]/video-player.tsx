"use client";
// @ts-ignore: side-effect import of CSS without type declarations
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState, useRef } from "react";
import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export function CodemateConnectVideo({ room }: { room: Room }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const router = useRouter();

  // Use refs to track stable identities
  const roomRef = useRef(room);
  const sessionRef = useRef(session.data);

  // Only setup connection once when component mounts or when critical data changes
  useEffect(() => {
    // Only update refs if values have actually changed
    if (room.id !== roomRef.current?.id) {
      roomRef.current = room;
    }

    if (session.data?.user.id !== sessionRef.current?.user.id) {
      sessionRef.current = session.data;
    }

    // Early return checks
    if (!room) return;
    if (!session.data) return;

    const userId = session.data.user.id;
    console.log("Setting up video connection for room:", room.id);

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name ?? undefined,
        image: session.data.user.image ?? undefined,
      },
      tokenProvider: () => generateTokenAction(),
    });
    const call = client.call("default", room.id);
    call.join({ create: true });
    setClient(client);
    setCall(call);

    return () => {
      console.log("Cleaning up video connection");
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [room.id, session.data?.user.id]); // Only depend on the specific ID values that matter

  // Render a placeholder while initializing to prevent layout shifts
  if (!client || !call) {
    return <div className="w-full h-full flex items-center justify-center">Connecting to video call...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls
            onLeave={() => {
              router.push("/");
            }}
          />
          <CallParticipantsList onClose={() => undefined} />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}
