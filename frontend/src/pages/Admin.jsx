import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
import { Trash2, ShieldAlert, Users, UtensilsCrossed } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-b from-[#1a1f12] to-[#0c0f08] p-6">
        <div className="max-w-7xl mt-20 mx-auto">
          <Skeleton className="h-8 w-48 mb-6 bg-amber-500/20" />
          <Skeleton className="h-96 w-full bg-amber-500/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (localStorage.getItem("role") !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1f12] to-[#0c0f08] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-20 p-8 max-w-md mx-auto bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/30 shadow-xl"
        >
          <div className="flex justify-center mb-6">
            <ShieldAlert className="h-16 w-16 text-amber-500" />
          </div>
          <h1 className="font-serif text-3xl font-light text-white mb-3">Access Restricted</h1>
          <p className="text-amber-200/70 mb-6">Only Admin can access this page</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f12] to-[#0c0f08] mt-20 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 mb-4">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">Admin Portal</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-white/90">Admin Dashboard</h1>
          <p className="text-amber-200/60 mt-2">Manage users and monitor food donations</p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
        </motion.div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 bg-amber-500/10 p-1 pz-4 rounded-xl mb-8">
            <TabsTrigger 
              value="users" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-lg py-2 text-amber-200 transition-all"
            >
              <Users className="w-4 h-4 mr-2" /> Users
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black rounded-lg py-2 text-amber-200 transition-all"
            >
              <UtensilsCrossed className="w-4 h-4 mr-2" /> Food Donations
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-2xl shadow-xl overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-amber-500/10">
                        <TableRow className="border-b border-amber-500/20">
                          <TableHead className="text-amber-300 font-semibold">Name</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Email</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Role</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Donated/Received</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Address</TableHead>
                          <TableHead className="text-center text-amber-300 font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow
                            key={user._id}
                            className="border-b border-amber-500/10 hover:bg-amber-500/5 transition-colors duration-200"
                          >
                            <TableCell className="font-medium text-white/90">{user.name}</TableCell>
                            <TableCell className="text-amber-100/70">{user.email}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                                  : user.role === 'donor' 
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                              }`}>
                                {user.role}
                              </span>
                            </TableCell>
                            <TableCell className="text-amber-200/80">
                              {user.role === "receiver" && user.receivedFoods?.length}
                              {user.role === "donor" && user.donatedFoods?.length}
                              {user.role === "admin" && `${user.donatedFoods?.length} / ${user.receivedFoods?.length}`}
                            </TableCell>
                            <TableCell className="text-amber-100/60 text-sm">
                              {user.address?.street}, {user.address?.city}, {user.address?.state}
                            </TableCell>
                            <TableCell className="text-center">
                              <Dialog
                                open={confirmOpen && selectedUserId === user._id}
                                onOpenChange={setConfirmOpen}
                              >
                                <DialogTrigger asChild>
                                  <button
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/30 transition-all"
                                    onClick={() => {
                                      setSelectedUserId(user._id);
                                      setConfirmOpen(true);
                                    }}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Delete
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="bg-black/90 backdrop-blur-md border border-amber-500/30 rounded-2xl">
                                  <h3 className="font-serif text-xl text-white text-center">Confirm Deletion</h3>
                                  <p className="text-amber-200/70 text-center">
                                    Are you sure you want to delete <span className="text-amber-400 font-semibold">{user.name}</span>?
                                  </p>
                                  <div className="flex justify-center gap-4 mt-4">
                                    <button
                                      className="px-4 py-2 rounded-lg border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 transition"
                                      onClick={() => setConfirmOpen(false)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition"
                                      onClick={() => {
                                        handleDeleteUser(user._id);
                                        setConfirmOpen(false);
                                      }}
                                    >
                                      Yes, Delete
                                    </button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Analytics / Food Donations Tab */}
          <TabsContent value="analytics">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-2xl shadow-xl overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-amber-500/10">
                        <TableRow className="border-b border-amber-500/20">
                          <TableHead className="text-amber-300 font-semibold">#</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Food Name</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Quantity</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Donor</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Receiver</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Status</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Address</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Prep Date</TableHead>
                          <TableHead className="text-amber-300 font-semibold">Expiry</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {foods.map((food, index) => (
                          <TableRow key={food._id} className="border-b border-amber-500/10 hover:bg-amber-500/5 transition-colors">
                            <TableCell className="text-amber-200/70">{index + 1}</TableCell>
                            <TableCell className="font-semibold text-amber-300">{food.name}</TableCell>
                            <TableCell className="text-amber-100/80">{food.quantity}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium text-white/90">{food.donor?.name}</div>
                                <div className="text-xs text-amber-200/50">{food.donor?.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {food.receiver ? (
                                <div>
                                  <div className="font-medium text-white/90">{food.receiver.name}</div>
                                  <div className="text-xs text-amber-200/50">{food.receiver.email}</div>
                                </div>
                              ) : (
                                <span className="text-amber-400/50 italic">Not Reserved</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                food.status === "available"
                                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                  : food.status === "reserved"
                                  ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                  : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                              }`}>
                                {food.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-amber-100/60 text-sm">{food.address}</TableCell>
                            <TableCell className="text-amber-100/60 text-sm">
                              {new Date(food.preparationDate).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-amber-100/60 text-sm">
                              {new Date(food.expiryDate).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;