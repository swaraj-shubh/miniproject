import React, { useEffect, useState } from 'react';
import { admin, fetchAllUsers, deleteUserById } from "@/api/axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const [foods, setFoods] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await fetchAllUsers();
      setUsers(res.data);
      console.log("Fetched users:", res.data);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserById(userId);
      setUsers(prev => prev.filter(user => user._id !== userId));
      setConfirmOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await admin();
        setFoods(data);
        console.log("Fetched foods:", data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    loadUsers();
    console.log("users:", users);
  }, []);


  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

if (localStorage.getItem("role") !== "admin") {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Access Restricted</h1>
          <p className="text-gray-600 mb-6">
            Only Admin can access this page
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <>



    <div className="p-6 max-w-7xl mx-auto">      
      <Tabs defaultValue="users" className="w-full">
        {/* Tab Controls */}
        <TabsList className="grid w-full grid-cols-2 max-w-xs mx-auto mb-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Food Donations</TabsTrigger>
        </TabsList>

        {/* Users Tab Content */}
        <TabsContent value="users">
           {/* <div className="p-6 max-w-7xl mx-auto"> */}
           <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">Admin Panel - All Users</h2>
            <Card className="p-6 overflow-auto rounded-2xl shadow-lg border border-orange-200 bg-white">
              <Table>
                <TableHeader className="bg-orange-100 text-orange-900">
                  <TableRow>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Donated/Received</TableHead>
                    <TableHead className="font-semibold">Address</TableHead>
                    <TableHead className="text-center font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-orange-50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-orange-800">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                            : user.role === 'donor' 
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                        }`}>
                          {user.role}
                        </div>
                      </TableCell>            
                      <TableCell>
                        {user.role === "receiver" && user.receivedFoods?.length}
                        {user.role === "donor" && user.donatedFoods?.length}
                        {user.role === "admin" && <p>{user.donatedFoods?.length} / {user.receivedFoods?.length}</p>}
                      </TableCell>
                      <TableCell>
                        {user.address?.street}, {user.address?.city}, {user.address?.state}
                      </TableCell>
                      <TableCell className="text-center">
                        <Dialog
                          open={confirmOpen && selectedUserId === user._id}
                          onOpenChange={setConfirmOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="bg-orange-600 hover:bg-orange-700 text-white"
                              onClick={() => {
                                setSelectedUserId(user._id);
                                setConfirmOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="text-center">
                            <h3 className="text-lg font-semibold text-orange-800">Confirm Deletion</h3>
                            <p>
                              Are you sure you want to delete{" "}
                              <strong className="text-orange-600">{user.name}</strong>?
                            </p>
                            <div className="flex justify-center gap-4 mt-4">
                              <Button
                                variant="outline"
                                className="border-orange-400 text-orange-700"
                                onClick={() => setConfirmOpen(false)}orange
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                                onClick={() => {
                                  handleDeleteUser(user._id);
                                  setConfirmOpen(false);
                                }}
                              >
                                Yes, Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </TabsContent>



        {/* Analytics Tab Content */}
        <TabsContent value="analytics">
           <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">
        Admin Dashboard – All Food Donations
      </h2>
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-orange-200 dark:border-zinc-700">
        <table className="min-w-full text-sm text-left bg-white dark:bg-zinc-900">
          <thead className="bg-orange-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Food Name</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Receiver</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Prep Date</th>
              <th className="px-4 py-3">Expiry</th>
            </tr>
          </thead>
  
          <tbody className="divide-y divide-orange-100 dark:divide-zinc-800">
            {foods.map((food, index) => (
              <tr key={food._id} className="hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors">
                <td className="px-4 py-3 font-medium">{index + 1}</td>
                <td className="px-4 py-3 text-orange-600 dark:text-orange-400 font-semibold">{food.name}</td>
                <td className="px-4 py-3">{food.quantity}</td>
  
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{food.donor?.name}</div>
                    <div className="text-xs text-gray-500">{food.donor?.email}</div>
                  </div>
                </td>
  
                <td className="px-4 py-3">
                  {food.receiver ? (
                    <div>
                      <div className="font-medium">{food.receiver.name}</div>
                      <div className="text-xs text-gray-500">{food.receiver.email}</div>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Not Reserved</span>
                  )}
                </td>
  
                <td className="px-4 py-3 capitalize">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      food.status === "available"
                        ? "bg-green-100 text-green-600"
                        : food.status === "reserved"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {food.status}
                  </span>
                </td>
  
                <td className="px-4 py-3">{food.address}</td>
  
                <td className="px-4 py-3">
                  {new Date(food.preparationDate).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
  
                <td className="px-4 py-3">
                  {new Date(food.expiryDate).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </TabsContent>
      </Tabs>
    </div>
 







   
    </>
  );
  
};

export default Admin;
