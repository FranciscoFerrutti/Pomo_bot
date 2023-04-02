# Project_Hackitba: Pomo bot
Somos el grupo 'Ciberchimpances', compuesto por: Inaki Bengolea, Francisco Marcos Ferrutti, Christian Ijjas, Felix Lopez Menardi

Se desea aclarar que la mayoria del trabajo se hizo utilizando LiveShare en VSCode (del cual todos participamos) lo cual explica la mayoria de los commits viniendo de un participante.

1. bajarse repo de github
2. entrar a su cuenta de discord (recordar que debe estar en modo desarrollador)
3. Una vez dentro de su server, haga click derecho sobre su nombre de servidor y aprete el boton “Copy ID”
	Si está dentro de la web, también puede conseguir este ID del URL. Es el número que se encuentra entre “channel/“ y el último slash “/“
4.  Vamos a la terminal. Parese sobre el directorio de la repo, y ejecute el comando “ls -a”. Verá una archivo que se llama “.env”. Abralo como le guste (ej: “vim .env”) y cambie la variable de GUILD_ID al ID que se copio en el paso previo.
5. Vaya a un canal de texto cualquiera dentro de su servidor, y pegue este URL: https://discord.com/api/oauth2/authorize?client_id=1091629896360538122&permissions=8&scope=bot%20applications.commands
6. Dele click al URL, y acepte los pop-ups que piden permisos.
7. Dentro del directorio del repo, ejecute los siguientes comandos:
	“chmod +x run.sh”
	“./run.sh”
8. Debería ver que el bot está online en el server 
9. Aguarde unos momentos antes de utilizar el bot, a veces este tarda unos minutos en completar la configuración
10. Disfrute de su bot, los comandos se ejecutan con una barra antes del nombre “/“, y puede visualizar todos los comandos con el comando “/help”
11. Si desea desconectar el bot, presione ctrl+c en su terminal que está ejecutando el bot
