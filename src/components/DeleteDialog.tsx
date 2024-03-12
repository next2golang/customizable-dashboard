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
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"

interface DeleteDialogProps {
  RemoveDashboard: () => void;
}
export const DeleteDialog: React.FC<DeleteDialogProps> = ({ RemoveDashboard }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle><svg width="50px" height="50px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M154 260h568v700H154z" fill="#FF3B30" /><path d="M624.428 261.076v485.956c0 57.379-46.737 103.894-104.391 103.894h-362.56v107.246h566.815V261.076h-99.864z" fill="#030504" /><path d="M320.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883zM543.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883z" fill="#152B3C" /><path d="M721.185 345.717v-84.641H164.437z" fill="#030504" /><path d="M633.596 235.166l-228.054-71.773 31.55-99.3 228.055 71.773z" fill="#FF3B30" /><path d="M847.401 324.783c-2.223 0-4.475-0.333-6.706-1.034L185.038 117.401c-11.765-3.703-18.298-16.239-14.592-27.996 3.706-11.766 16.241-18.288 27.993-14.595l655.656 206.346c11.766 3.703 18.298 16.239 14.592 27.996-2.995 9.531-11.795 15.631-21.286 15.631z" fill="#FF3B30" /></svg>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={RemoveDashboard}
          >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
