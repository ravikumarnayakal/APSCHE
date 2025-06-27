
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Eye, MessageCircle } from "lucide-react";

interface Booking {
  id: number;
  propertyTitle: string;
  renterName: string;
  renterEmail: string;
  status: "pending" | "approved" | "rejected" | "completed";
  requestDate: string;
  moveInDate: string;
  monthlyRent: number;
  message: string;
}

export const BookingManager = ({ userRole }: { userRole: string }) => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      propertyTitle: "Modern Downtown Apartment",
      renterName: "Alice Johnson",
      renterEmail: "alice@email.com",
      status: "pending",
      requestDate: "2024-01-20",
      moveInDate: "2024-02-01",
      monthlyRent: 3200,
      message: "I'm a working professional with excellent references. I'm looking for a long-term rental."
    },
    {
      id: 2,
      propertyTitle: "Cozy Studio Near Campus",
      renterName: "Bob Smith",
      renterEmail: "bob@email.com",
      status: "approved",
      requestDate: "2024-01-18",
      moveInDate: "2024-01-25",
      monthlyRent: 1800,
      message: "Graduate student, non-smoker, no pets. Available for immediate move-in."
    }
  ]);

  const handleBookingAction = (bookingId: number, action: "approve" | "reject") => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: action === "approve" ? "approved" : "rejected" }
        : booking
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
        <p className="text-gray-600">
          {userRole === "owner" ? "Manage booking requests for your properties" : "Track your booking requests"}
        </p>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{booking.propertyTitle}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Request from: <span className="font-medium">{booking.renterName}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(booking.status)}
                  <Badge className={`${getStatusColor(booking.status)} border-0`}>
                    {booking.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Request Date:</span>
                  <p className="font-medium">{booking.requestDate}</p>
                </div>
                <div>
                  <span className="text-gray-500">Move-in Date:</span>
                  <p className="font-medium">{booking.moveInDate}</p>
                </div>
                <div>
                  <span className="text-gray-500">Monthly Rent:</span>
                  <p className="font-medium">${booking.monthlyRent.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <span className="text-gray-500 text-sm">Renter's Message:</span>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">{booking.message}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>

                {userRole === "owner" && booking.status === "pending" && (
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleBookingAction(booking.id, "approve")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleBookingAction(booking.id, "reject")}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
