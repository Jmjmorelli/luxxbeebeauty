This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## APP

- A web app I am developing for my friend that will be used to manage bookings and deposits for her cosmetology efforts

- Will mainly be used by mobile, but has a simple desktop/mobile view for the moment. 
- Currently has a list of services with prices and descriptions.
- At the moment full prices are paid in person to @luxxbeebeauty, as the app only manages deposits and scheduling logic.

- Clients can book with selected services at available times and leave any notes
- App/DB tracks all appointments with client information, services, and prices.

- Im using Turso as the database and Drizzle ORM as the ORM, with the libSQL driver/client underneath.
[here!!](https://orm.drizzle.team/docs/tutorials/drizzle-with-turso)
- Outsourcing [SimplePDF](https://simplepdf.com/embed#embed-editor) for the document signings
- Using nodemailer for sending outgoing emails via SMTP
## Notes to self

- config for mobile dev network testing (check)