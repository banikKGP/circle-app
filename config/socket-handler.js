const circleManager = require("../app_modules/circles/manager");
const circleUserManager = require("../app_modules/circles/temp-users/manager");

module.exports = (io) =>{
    console.log('setting up socket connection');
    io.on("connection", socket => {
        
        socket.on("join", async (circleUserId, circleId) => {
            try {
                if(circleId && circleUserId){
                    socket.join(circleId);
                    circleUser = await circleUserManager.getUser({circleUserId, circleId});
                    circleUser = JSON.parse(JSON.stringify(circleUser));
                    socket.broadcast.to(circleId).emit('onSuccessfulJoin', circleUser);
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
        socket.on("new-ice-candidate", async ({circleUserId, candidate, circleId}) => {
            try {
                circleUser = await circleUserManager.getUser({circleUserId, circleId});
                circleUser = JSON.parse(JSON.stringify(circleUser));
                socket.broadcast.to(circleId).emit('candidate-received', {circleUser, candidate});
            } catch(err) {
                socket.to(circleId).emit('onError', err);
            }
            
        });
        socket.on("onDisconnectCircle", async ({circleUserId, circleId}) => {
            try {
                var candidateLeft = await circleUserManager.removeUser({circleUserId, circleId});
                candidateLeft = JSON.parse(JSON.stringify(candidateLeft));
                socket.broadcast.to(circleId).emit('candidate-exit', candidateLeft);
            } catch(err) {
                socket.to(circleId).emit('onError', err);
            }
        });
    });
};