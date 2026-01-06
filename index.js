
//Importing express module
const express = require("express")
//Creating an express app
const app = express()
//Allows app to read data from the POST
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"))
//Setting up route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
//Setting up route for the halloween page
app.get("/halloween", (req, res) => {
  res.sendFile(__dirname + "/public/halloween.html");
})
//Starts the server and logs a message
app.listen(3000, () => {
  console.log(`Holiday Server is Running!`)
});
//Setting up the form
app.post("/send-order", async (req, res) => {
  //Defining the name for later use
  const name = req.body.name;
  //Making sure the name is valid
  if (!name || name.trim() === "") {
    //Tells user again to entr their name if they didn't
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: #000;
            color: #ff6f00;
            padding: 50px;
          }
          h1 {
            font-size: 3rem;
            margin-bottom: 20px;
          }
          p {
            font-size: 1.5rem;
          }
        </style>
      </head>
      <body>
        <h1>👻 Oops! 👻</h1>
        <p>Please enter your name to place the order.</p>
      </body>
      </html>
    `);
  }
  //Telling the user their order was placed
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Placed</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          background: #000;
          color: #ff6f00;
          padding: 50px;
          background-image: radial-gradient(circle at 20% 80%, rgba(255, 111, 0, 0.3) 0%, transparent 50%), 
                            radial-gradient(circle at 80% 20%, rgba(255, 255, 0, 0.2) 0%, transparent 50%), 
                            radial-gradient(circle at 40% 40%, rgba(255, 0, 0, 0.1) 0%, transparent 50%);
          background-size: 200px 200px, 150px 150px, 100px 100px;
          background-repeat: no-repeat;
          background-position: top left, top right, center;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px #000, 0 0 10px #ff6f00;
          animation: flicker 2s infinite alternate;
        }
        @keyframes flicker {
          0% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        p {
          font-size: 1.5rem;
          text-shadow: 1px 1px 2px #000;
        }
        .pumpkin {
          font-size: 4rem;
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      </style>
    </head>
    <body>
      <h1>🎃 Order Successfully Placed! 🎃</h1>
      <p>Thank you, ${name}! Your spooky candy order is on its way.</p>
      <p class="pumpkin">🍬👻🦇</p>
    </body>
    </html>
  `);
});
