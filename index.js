const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle 
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let contadorMensajes = 0;
const LIMITE_SPAWN = 25;

const personajesSWF = [
    { 
        nombre: "Chispas", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486566562603148/1827_sin_titulo_0000-17-02_20261018160811.png?ex=6ad68730&is=6ad535b0&hm=bd2637c7e616549b3a68791f741dbc63459dc3ed22ac9f7e300b4bb528054d96&", 
        raridad: "Especial" 
    },
    { 
        nombre: "Saltador", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486527681273876/1827_sin_titulo_20261018155009.png?ex=6ad68727&is=6ad535a7&hm=2f0f7dfbb73cfe586276a9316079cda427b7e68c92706651029df6470039cd5b&", 
        raridad: "Raro" 
    },
    { 
        nombre: "Corredor", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486527979323452/1827_sin_titulo_20261018155053.png?ex=6ad68727&is=6ad535a7&hm=b662e6a170011281d0f7824b0aaa28127d954739dc4d76c4db2bededf7fa2d28&", 
        raridad: "Común" 
    },
    { 
        nombre: "Luna", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486527312298094/1827_sin_titulo_20261018154726.png?ex=6ad68727&is=6ad535a7&hm=822555fe73ead8887100617c0c0a88b6d95659b321990e5072d1fbd449a3d076&", 
        raridad: "Raro" 
    },
    { 
        nombre: "Plataforma", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486528348426291/1827_sin_titulo_20261018155305.png?ex=6ad68727&is=6ad535a7&hm=b998bd861cab4df2fbcb3b5da41d0650ff721fd46e7d9c64d2040d4c85c10ea9&", 
        raridad: "Común" 
    },
    { 
        nombre: "Burbuja", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486528767725769/1827_sin_titulo_20261018155625.png?ex=6ad68727&is=6ad535a7&hm=0b9243251723bfd4b6b8aee7e5d70ed823bd46f1838f8f22b9ec61764aa5074b&", 
        raridad: "Común" 
    },
    { 
        nombre: "Trampolín", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486529187029022/1827_sin_titulo_20261018155745.png?ex=6ad68727&is=6ad535a7&hm=07b880e4a2424006763c6175ddce222ee2e7fd5edcf053d83953f30cbbd8faae&", 
        raridad: "Raro" 
    },
    { 
        nombre: "Trampa de marea", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486529954709665/1827_sin_titulo_20261018155849.png?ex=6ad68727&is=6ad535a7&hm=6e101abb846e8e7e912075e6ec1584c44e93500a3807c8b9e77a3158420d2ed9&", 
        raridad: "Épico" 
    },
    { 
        nombre: "Ataques Simples", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486529572896768/1827_sin_titulo_20261018155816.png?ex=6ad68727&is=6ad535a7&hm=38433ac3c265b1b97d976397877610d83a278d927e01f062251c08a58bd6728c&", 
        raridad: "Común" 
    },
    { 
        nombre: "Elástico", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486530252378272/1827_sin_titulo_20261018160003.png?ex=6ad68727&is=6ad535a7&hm=57565de945571b0875482b0b73c87665d4c63f99efc91d78259fa83c3d3e75b1&", 
        raridad: "Raro" 
    },
    { 
        nombre: "Toque de Midas", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486530722136175/1827_sin_titulo_20261018160034.png?ex=6ad68727&is=6ad535a7&hm=f2124ce2aaae22fc5356f023b8b1cca3b81385802c4be6f456cf4941a76b83f7&", 
        raridad: "Legendario" 
    },
    { 
        nombre: "Gigante", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486564528361565/1827_sin_titulo_20261018155912.png?ex=6ad68730&is=6ad535b0&hm=30176539b3dfc4f6bdc9986a007944eebec7d59c5a35f7ec96ad7da19f50c013&", 
        raridad: "Épico" 
    },
    { 
        nombre: "Botella de agua", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486564834418708/1827_sin_titulo_20261018160229.png?ex=6ad68730&is=6ad535b0&hm=aaf0bcc2f2a1751d8133d7a6a4284cc618e8f02d83e186be0c6c44e6523275f4&", 
        raridad: "Común" 
    },
    { 
        nombre: "Defensa", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486565128278259/1827_sin_titulo_20261018160335.png?ex=6ad68730&is=6ad535b0&hm=b21e4da6dcc1f0f40bb236a937176cd1434ae3a4f6f5de2f131095b8a8f0da20&", 
        raridad: "Raro" 
    },
    { 
        nombre: "Ofensa", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486565455306752/1827_sin_titulo_20261018160433.png?ex=6ad68730&is=6ad535b0&hm=8a75a4603091141f2c0060d4ba900a802a8969db78e30301fe1709e47c1fdbc5&", 
        raridad: "Raro" 
    },
    { 
        nombre: "Hammer", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486565828595782/1827_sin_titulo_0000-17-02_20261018160524.png?ex=6ad68730&is=6ad535b0&hm=91060ddd5d82730086d10b954c44eee1f13aa7c744e08c388a99c82287a96770&", 
        raridad: "Raro" 
    },
    { 
        nombre: "Tsunami", 
        imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486566281445406/1827_sin_titulo_0000-17-02_20261018160613.png?ex=6ad68730&is=6ad535b0&hm=fe6dc09b83ed6cc76de3860de609be3b716a3ff435deca5f58d11a6f98ec87c6&", 
        raridad: "Legendario" 
    }
];

let personajeActual = null;
const inventarios = {};

client.on('ready', () => {
    console.log(`¡Bot iniciado como ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    contadorMensajes++;

    if (contadorMensajes >= LIMITE_SPAWN) {
        contadorMensajes = 0;
        personajeActual = personajesSWF[Math.floor(Math.random() * personajesSWF.length)];

        const embedSpawn = new EmbedBuilder()
            .setTitle("¡Un nuevo Swimmer ha aparecido!")
            .setDescription("¡Presiona el botón de abajo para intentarlo atrapar!")
            .setImage(personajeActual.imagen)
            .setColor("#0099ff");

        const botonCatch = new ButtonBuilder()
            .setCustomId('btn_catch')
            .setLabel('Catch me!')
            .setStyle(ButtonStyle.Primary);

        const fila = new ActionRowBuilder().addComponents(botonCatch);

        await message.channel.send({ embeds: [embedSpawn], components: [fila] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton() && interaction.customId === 'btn_catch') {
        if (!personajeActual) {
            return await interaction.reply({ content: "Este Swimmer ya fue atrapado o desapareció.", ephemeral: true });
        }

        const modal = new ModalBuilder()
            .setCustomId('modal_catch')
            .setTitle('¡Atrapa al Swimmer!');

        const campoNombre = new TextInputBuilder()
            .setCustomId('input_nombre')
            .setLabel("¿Cuál es el nombre de este Swimmer?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Escribe el nombre aquí...')
            .setRequired(true);

        const primeraFila = new ActionRowBuilder().addComponents(campoNombre);
        modal.addComponents(primeraFila);

        await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modal_catch') {
        const respuesta = interaction.fields.getTextInputValue('input_nombre');

        if (!personajeActual) {
            return await interaction.reply({ content: "¡Alguien más lo atrapó antes!", ephemeral: true });
        }

        const nombreValido = respuesta.toLowerCase() === personajeActual.nombre.toLowerCase() || 
                             (personajeActual.nombre === "Hammer" && respuesta.toLowerCase() === "martillo");

        if (nombreValido) {
            const userId = interaction.user.id;
            if (!inventarios[userId]) inventarios[userId] = [];
            
            inventarios[userId].push(personajeActual);
            const atrapado = personajeActual;
            personajeActual = null;

            await interaction.reply(`¡Felicidades ${interaction.user}! Has atrapado a **${atrapado.nombre}** (${atrapado.raridad}).`);
        } else {
            await interaction.reply({ content: "¡Nombre incorrecto! Inténtalo de nuevo.", ephemeral: true });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
