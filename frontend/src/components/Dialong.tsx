import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Find Match</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Culprit Information</DialogTitle>
          <DialogDescription>
            Here is the information about the identified culprit.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <p className="col-span-3">Pedro Duarte</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="match-percentage" className="text-right">
              Match Percentage
            </Label>
            <p className="col-span-3">85%</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="culprit-info" className="text-right">
              Culprit Info
            </Label>
            <p className="col-span-3">
              Culprit has dark hair, brown eyes, and a tattoo on his left arm.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
