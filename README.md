# Aniversario Instituto

#### [Jump to english](#english)

## Descripción

Esta web se creó en enero para el aniversario del Instituto. Se creó con el fin de que los alumnos pudieran registrarse a sus actividades favoritas.  
Ya que ha pasado el evento, he decidido hacer el código abierto para que cualquiera pueda verlo, y aprender de su estructura interna 😄

Debido a su publicación con la licencia GNU GPL v3, he añadido algunos comentarios en el código para que sea más fácil de entender.

*La web que se ve si se accede al dominio en este momento se sitúa en [la rama `current`](https://github.com/SrIzan10/aniversario-instituto/tree/current)*

## Tiempo total de desarrollo
En total unas 25 horas de escritura activa de código, pero en el editor de código unas 35 horas.

*Tiempo seguido, pero queda varias horas que no se han registrado*
[![wakatime](https://wakatime.com/badge/user/4ad16edf-eadc-48d9-b010-26f275fe0be6/project/018d2354-821e-43f5-afe4-174687ac6de3.svg)](https://wakatime.com/badge/user/4ad16edf-eadc-48d9-b010-26f275fe0be6/project/018d2354-821e-43f5-afe4-174687ac6de3)

## Tecnologías
### Frontend
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Mantine](https://img.shields.io/badge/Mantine-ffffff?style=for-the-badge&logo=Mantine&logoColor=339af0)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
### Backend
![Mantine](https://img.shields.io/badge/Clerk-7857FF?style=for-the-badge&logo=Clerk)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Sentry](https://img.shields.io/badge/sentry-452650?style=for-the-badge&logo=sentry&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/railway-13111c.svg?style=for-the-badge&logo=railway&logoColor=white)

## Desarrollo

Crear un nuevo proyecto de [Clerk](https://clerk.com) y configuar las variables en el archivo `.env.local`.  
Además añadir una variable llamada `EMAIL_DOMAIN` con el dominio de los correos electrónicos de los alumnos sin la arroba.  
Después, rellenar la variable `DATABASE_URL` en el archivo `.env` con la URL de la base de datos de MongoDB.  
Finalmente, instala las dependencias con `yarn install` y ejecuta el proyecto con `yarn dev`.  
> [!NOTE]  
> Puede tardar un rato en cargar

# English

## Description
This website was created in January for the school's anniversary. It was created so that students could register for their favorite activities.
Since the event has passed, I have decided to make the code open source so that anyone can see it, and learn from its internal structure 😄

Due to its publication with the GNU GPL v3 license, I have added some comments in the code to make it easier to understand.

*The website that is seen if you access the domain at this time is located in [the `current` branch](https://github.com/SrIzan10/aniversario-instituto/tree/current)*

## Total development time
In total about 25 hours of active code writing, but in the code editor about 35 hours.

*Time tracked, but there's more time that I didn't track*
[![wakatime](https://wakatime.com/badge/user/4ad16edf-eadc-48d9-b010-26f275fe0be6/project/018d2354-821e-43f5-afe4-174687ac6de3.svg)](https://wakatime.com/badge/user/4ad16edf-eadc-48d9-b010-26f275fe0be6/project/018d2354-821e-43f5-afe4-174687ac6de3)

## Technologies
*Scroll back up to [Tecnologías](#tecnologías)*

## Development

Create a new [Clerk](https://clerk.com) project and configure the variables in the `.env.local` file.
Also add a variable called `EMAIL_DOMAIN` with the domain of the students' email addresses without the @.
Then, fill in the `DATABASE_URL` variable in the `.env` file with the URL of the MongoDB database.
Finally, install the dependencies with `yarn install` and run the project with `yarn dev`.
> [!NOTE]
> It may take a while to load