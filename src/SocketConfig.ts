export const SocketConfig = ({ socket }: { socket: any }) => {
  let allUsers: string[] = [];
  // active interact with all user in application
  socket.on("start-active", (data: any) => {
    console.log("active -->", data);
    socket.broadcast.emit("active", data);
  });
  // join room
  socket.on("join-room", (data: any) => {
    console.log("join room", data);
    socket.join(data);
  });
  // sent message in broadcast
  socket.on("send-message", (data: any) => {
    console.log("send", data);
    socket.broadcast.emit("receive-message", data);
    // socket.to(data.room).emit("receive-message", data);
  });
};
