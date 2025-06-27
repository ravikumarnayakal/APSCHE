
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft } from "lucide-react";

interface Conversation {
  id: number;
  otherUser: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  propertyTitle?: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export const MessagingSystem = ({ onClose }: { onClose: () => void }) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  // Mock data
  const conversations: Conversation[] = [
    {
      id: 1,
      otherUser: "John Smith",
      lastMessage: "Yes, the apartment is still available. When would you like to schedule a viewing?",
      timestamp: "2 min ago",
      unread: true,
      propertyTitle: "Modern Downtown Apartment"
    },
    {
      id: 2,
      otherUser: "Sarah Johnson",
      lastMessage: "Thank you for your interest. I'll get back to you soon.",
      timestamp: "1 hour ago",
      unread: false,
      propertyTitle: "Cozy Studio Near Campus"
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: "John Smith",
      content: "Hi! I saw your inquiry about the downtown apartment. It's still available.",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Great! Can you tell me more about the amenities and parking situation?",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "John Smith",
      content: "The apartment has a gym, pool, and secure parking. Would you like to schedule a viewing?",
      timestamp: "10:35 AM",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Conversations List */}
          <div className="w-1/3 border-r bg-gray-50">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Conversations</h3>
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation === conversation.id
                        ? "bg-blue-100 border border-blue-200"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-sm">{conversation.otherUser}</h4>
                      {conversation.unread && (
                        <Badge variant="default" className="bg-blue-600 text-xs">New</Badge>
                      )}
                    </div>
                    {conversation.propertyTitle && (
                      <p className="text-xs text-blue-600 mb-1">{conversation.propertyTitle}</p>
                    )}
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-gray-400 mt-1">{conversation.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-white">
                  <h3 className="font-semibold">
                    {conversations.find(c => c.id === selectedConversation)?.otherUser}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {conversations.find(c => c.id === selectedConversation)?.propertyTitle}
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? "text-blue-100" : "text-gray-500"
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
