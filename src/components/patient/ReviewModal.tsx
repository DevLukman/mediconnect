"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPencilBox, IconStar, IconStarFill } from "@intentui/icons";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export function ReviewModal({ name }: { name: string }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");

  const activeRating = hovered || rating;

  function handleSubmit() {
    console.log({ rating, review });
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setRating(0);
      setHovered(0);
      setReview("");
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <>
        <DialogTrigger asChild>
          <Button type="button" variant={"outline"}>
            <span>
              <IconPencilBox />
            </span>
            <span>Review</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Write a Review
            </DialogTitle>
            <DialogDescription>
              Share your experience with Dr.
              <span className="capitalize">{name}</span>
            </DialogDescription>
          </DialogHeader>

          {/* Star Rating */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  aria-label={`Rate ${star} out of 5`}
                >
                  {star <= activeRating ? (
                    <IconStarFill className="size-8 text-yellow-400 transition-colors duration-150" />
                  ) : (
                    <IconStar className="text-muted-foreground size-8 transition-colors duration-150" />
                  )}
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-muted-foreground text-sm">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div className="py-4">
            <Label className="pb-2 text-base">Your Review</Label>
            <Textarea
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={rating === 0}
            >
              Sumbit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </>
    </Dialog>
  );
}
