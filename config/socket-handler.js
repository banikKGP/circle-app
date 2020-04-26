const circleManager = require("../app_modules/circles/manager")

module.exports = (io) =>{
    console.log('setting up socket connection');
    io.on("connection", socket => {
        
        socket.on("join", (userName, circleId) => {
            try {
                if(circleId && userName){
                    socket.join(circleId);
                    // newUser = await circleManager.addNewUser({userName, circleId});
                    socket.broadcast.to(circleId).emit('onSuccessfulJoin', `${userName}`);
                }
            } catch(err) {
                socket.to(circleId).emit('onError', err);
            }
        });

        socket.on("call-user", (offer, circleId) => {
            socket.broadcast.to(circleId).emit('call-made', offer);
            // socket.emit(circleId).emit('call-made', offer);
            // socket.to(circleId).emit('onError', 'offer');
        }); 
        socket.on("make-answer", (answer, circleId) => {
            // io.in(circleId).emit('answer-made', answer);
            socket.broadcast.to(circleId).emit('answer-made', answer);
        });
        socket.on("new-ice-candidate", ({userName, candidate, circleId}) => {
            peerUser = userName;
            socket.broadcast.to(circleId).emit('candidate-received', {peerUser, candidate});
        });
    });
};