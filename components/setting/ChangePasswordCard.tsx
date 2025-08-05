import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChangePassword } from '@/reactQuery/mutation/home';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChangePasswordCard = () => {
  const { mutate, isPending:isLoading, isError, error, isSuccess } = useChangePassword();


  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          you can update your password here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input placeholder="Store Name" />
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordCard;
