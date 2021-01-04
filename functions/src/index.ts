import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'activoi.contacto@gmail.com',
        pass: 'ACTIVO!1',
    },
});

export const contactEmail = functions.firestore.document('contactMessages/{id}').onCreate(
    async (event) => {
        const data = event.data();
        await sendEmail(data);
        return;
    }
);

export const propertyEmail = functions.firestore.document('contactProperty/{id}').onCreate(
    async (event) => {
        const data = event.data();
        await sendPropertyEmail(data);
        return;
    }
);

function sendEmail(data: any): Promise<any> {
    return transport.sendMail({
        from: 'Robot <bot@activoi.com>',
        to:'activoi.contacto@gmail.com',
        cc:'andmarti1224@gmail.com',
        subject: 'Nuevo mensaje de contacto!',
        html: `
        <h1>Tienes un nuevo mensaje de contacto!</h1> <br>
        <p> De: <strong> ${data.name} </strong>
        <br> 
        Correo: <strong> ${data.email} </strong>
        <br>
        Asunto: ${data.subject} 
        <br>
        ${data.message}
        </p>
        `,

    }).then().catch((e) => e);
}

function sendPropertyEmail(data: any): Promise<any> {
    return transport.sendMail({
        from: 'Robot <bot@activoi.com>',
        to:'andmarti1224@gmail.com',
        subject: 'Alguien pregunto por una propiedad',
        html: `
        <h1>Tienes un nuevo mensaje de contacto!</h1> <br>
        <p> De: <strong> ${data.name} </strong>
        <br> 
        Correo: <strong> ${data.email} </strong>
        <br>
        Propiedad: <strong> ${data.address} </strong>
        <br>
        <br>
        ${data.message}
        </p>
        <a href="https://activoi.com/propiedad/${data.id}"> Ver la Propiedad </a>
        `,

    }).then().catch((e) => e);
}