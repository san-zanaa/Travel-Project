"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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


export default function AddDestinationPage() {
    const [category, setCategory] = useState("Beach");


    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const destination = {
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
            const response = await fetch(
                "http://localhost:8000/all-destination",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(destination),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add travel package");
            }

            const data = await response.json();

            console.log("Destination added successfully:", data);
            alert("Travel package added successfully!");
            event.currentTarget.reset();
            setCategory("Beach");
        } catch (error) {
            console.error("Error adding destination:", error);
            alert("Failed to add travel package. Please try again.");
        }
    };


    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <main className="min-h-screen bg-white px-5 py-8 sm:px-10 sm:py-10 lg:px-[54px]">
            <h1 className="text-3xl font-normal tracking-[-1.5px] text-black sm:text-4xl">
                Add New Travel Package
            </h1>

            <div className="mx-auto mt-12 w-full max-w-[512px] border border-gray-100 bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.12)] sm:mt-14 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-3">

                    <div className="space-y-1.5">
                        <Label htmlFor="destinationName" className="text-xs font-medium">
                            Destination Name
                        </Label>
                        <Input
                            id="destinationName"
                            name="destinationName"
                            placeholder="Bali Paradise"
                            required
                            className="h-8 rounded-none border-gray-100 bg-gray-50 text-xs shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="country" className="text-xs font-medium">
                                Country
                            </Label>
                            <Input
                                id="country"
                                name="country"
                                placeholder="Indonesia"
                                required
                                className="h-8 rounded-none border-gray-100 bg-gray-50 text-xs shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="category" className="text-xs font-medium">
                                Category
                            </Label>
                            <Select
                                value={category}
                                onValueChange={(value) => {
                                    if (value) {
                                        setCategory(value);
                                    }
                                }}
                            >
                                <SelectTrigger
                                    id="category"
                                    className="h-8 w-full rounded-none border-gray-100 bg-gray-50 text-xs shadow-none focus:ring-1"
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
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="price" className="text-xs font-medium">
                                Price (USD)
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                placeholder="e.g., 1299"
                                required
                                className="h-8 rounded-none border-gray-100 bg-gray-50 text-xs shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="duration" className="text-xs font-medium">
                                Duration
                            </Label>
                            <Input
                                id="duration"
                                name="duration"
                                placeholder="e.g., 7 Days/6 Nights"
                                required
                                className="h-8 rounded-none border-gray-100 bg-gray-50 text-xs shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="departureDate" className="text-xs font-medium">
                            Departure Date
                        </Label>
                        <Input
                            id="departureDate"
                            name="departureDate"
                            type="date"
                            required
                            className="h-8 rounded-none border-gray-100 bg-gray-50 text-xs shadow-none focus-visible:ring-1"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="imageUrl" className="text-xs font-medium">
                            Image URL
                        </Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            required
                            className="h-8 rounded-none border-gray-100 bg-gray-50 text-xs shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="description" className="text-xs font-medium">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe the travel experience..."
                            required
                            className="min-h-[97px] resize-y rounded-none border-gray-100 bg-gray-50 text-xs shadow-none placeholder:text-gray-500 focus-visible:ring-1"
                        />
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5 pt-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            className="h-9 rounded-none border-red-400 px-4 text-xs font-normal text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                            <Trash2 className="mr-1.5 size-3.5" />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="h-9 rounded-none bg-[#17a2b8] px-4 text-xs font-normal text-white hover:bg-[#138496]"
                        >
                            <Save className="mr-1.5 size-3.5" />
                            Add Travel Package
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
