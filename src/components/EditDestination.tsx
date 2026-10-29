"use client";

import { useState } from "react";
import { Save } from "lucide-react";

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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";

interface IDestination {
_id: string;
destinationName: string;
country: string;
category: string;
price: number;
duration: string;
departureDate: string;
imageUrl: string;
description: string;
}

interface EditDestinationProps {
destination: IDestination;
}

export function EditDestination({ destination }: EditDestinationProps) {
const [category, setCategory] = useState(destination.category);
const [open, setOpen] = useState(false);
const [loading, setLoading] = useState(false);

const handleSubmit = async (
event: React.FormEvent<HTMLFormElement>
) => {
event.preventDefault();

const form = event.currentTarget;
const formData = new FormData(form);

const updatedDestination = {
  destinationName: formData.get("destinationName"),
  country: formData.get("country"),
  category,
  price: Number(formData.get("price")),
  duration: formData.get("duration"),
  departureDate: formData.get("departureDate"),
  imageUrl: formData.get("imageUrl"),
  description: formData.get("description"),
};

try {
  setLoading(true);

  const response = await fetch(
    `http://localhost:8000/all-destination/${destination._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDestination),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update destination");
  }

  alert("Travel package updated successfully!");
  setOpen(false);
  window.location.reload();
} catch (error) {
  console.error("Error updating destination:", error);
  alert("Failed to update travel package. Please try again.");
} finally {
  setLoading(false);
}

};

return (
<Dialog
open={open}
onOpenChange={(nextOpen) => {
setOpen(nextOpen);

    if (nextOpen) {
      setCategory(destination.category);
    }
  }}
>
  <DialogTrigger
    render={
      <Button
        type="button"
        variant="ghost"
        className="cursor-pointer hover:bg-transparent hover:text-current"
      >
        Edit
      </Button>
    }
  />

  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[560px]">
    <DialogHeader>
      <DialogTitle>Update Travel Package</DialogTitle>
      <DialogDescription>
        Make changes to the travel package details below.
      </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-3">
        <Field>
          <Label htmlFor="destinationName">Destination Name</Label>
          <Input
            id="destinationName"
            name="destinationName"
            defaultValue={destination.destinationName}
            placeholder="Bali Paradise"
            required
            className="rounded-none bg-gray-50"
          />
        </Field>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              defaultValue={destination.country}
              placeholder="Indonesia"
              required
              className="rounded-none bg-gray-50"
            />
          </Field>

          <Field>
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(value) => {
                if (value) setCategory(value);
              }}
            >
              <SelectTrigger
                id="category"
                className="w-full rounded-none bg-gray-50"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beach">Beach</SelectItem>
                <SelectItem value="Mountain">Mountain</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="City">City</SelectItem>
                <SelectItem value="Cultural">Cultural</SelectItem>
                <SelectItem value="Nature">Nature</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field>
            <Label htmlFor="price">Price (USD)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              defaultValue={destination.price}
              placeholder="1299"
              required
              className="rounded-none bg-gray-50"
            />
          </Field>

          <Field>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              defaultValue={destination.duration}
              placeholder="7 Days/6 Nights"
              required
              className="rounded-none bg-gray-50"
            />
          </Field>
        </div>

        <Field>
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            id="departureDate"
            name="departureDate"
            type="date"
            defaultValue={destination.departureDate?.slice(0, 10)}
            required
            className="rounded-none bg-gray-50"
          />
        </Field>

        <Field>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={destination.imageUrl}
            placeholder="https://example.com/image.jpg"
            required
            className="rounded-none bg-gray-50"
          />
        </Field>

        <Field>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={destination.description}
            placeholder="Describe the travel experience..."
            required
            className="min-h-[97px] resize-y rounded-none bg-gray-50"
          />
        </Field>
      </FieldGroup>

      <DialogFooter className="mt-5 gap-2">
        <DialogClose
          render={
            <Button
              type="button"
              variant="outline"
              className="rounded-none border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Cancel
            </Button>
          }
        />

        <Button
          type="submit"
          disabled={loading}
          className="rounded-none bg-[#17a2b8] text-white hover:bg-[#138496]"
        >
          <Save className="mr-1.5 size-4" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

);
}