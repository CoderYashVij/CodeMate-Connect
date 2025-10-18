"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon, PencilIcon, TrashIcon } from "lucide-react";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoomAction } from "./actions";

export function UserRoomCard({ room }: { room: Room }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="relative">
        <Button asChild className="absolute top-2 right-2" size="icon" variant="outline">
          <Link href={`/edit-room/${room.id}`}>
            <PencilIcon className="w-4 h-4" />
          </Link>
        </Button>
        <CardTitle className="pr-12">{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-grow">
        <TagsList tags={splitTags(room.tags)} />
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2 text-sm hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="w-4 h-4" />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 pt-4">
        <Button asChild className="flex-1">
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="shrink-0">
              <TrashIcon className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id);
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
