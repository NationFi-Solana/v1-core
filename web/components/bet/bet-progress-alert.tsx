import { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogContent } from '../shared/ui/alert-dialog';
import { Button } from '../shared/ui/button';
import { BounceLoader, ClipLoader } from 'react-spinners';

interface Props {
  waitForSign: boolean;
  isTxPending: boolean;
}

export default function BetProgressAlert({ waitForSign, isTxPending }: Props) {
  const [o, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (waitForSign) {
      setOpen(true);
      setMessage('Please Sign Transaction.');
    }
    if (isTxPending) {
      setOpen(true);
      setMessage('Waiting for block.');
    }
    if (!waitForSign && !isTxPending) {
      setOpen(false);
    }
  }, [waitForSign, isTxPending]);
  return (
    <AlertDialog open={o} onOpenChange={setOpen}>
      <AlertDialogContent
        align="center"
        animate="none"
        closeColor={'black'}
        className=" overflow-hidden bg-transparent"
      >
        <div className="space-y-3 rounded-md bg-secondary p-8 text-white">
          <div className="flex gap-x-4 items-center">
            <h2 className="pb-1 text-center font-lora text-xl">
              Processing...
            </h2>
            <BounceLoader
              color={'#F5B800'}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <Button
            role="button"
            className="w-full"
            onClick={() => setOpen(false)}
            variant="primary"
            type="button"
          >
            Close
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
