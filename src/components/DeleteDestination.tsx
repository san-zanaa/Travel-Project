"use client"
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export function DeleteDestination({id}) {
    const handleDelete = async() => {
        const response = await fetch(`http://localhost:8000/all-destination/${id}`, {
        method: "DELETE"
    })
    const data = await response.json();

    redirect('/destinations')
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline">Cancel</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete ? This action cannot be undone and will permanently remove this travel package from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 text-white">Delete Package</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
