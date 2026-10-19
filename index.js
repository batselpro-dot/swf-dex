const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle,
    REST,
    Routes,
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType
} = require('discord.js');
const http = require('http');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const personajesSWF = [
    { nombre: "Chispas", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486566562603148/1827_sin_titulo_0000-17-02_20261018160811.png?ex=6ad68730&is=6ad535b0&hm=bd2637c7e616549b3a68791f741dbc63459dc3ed22ac9f7e300b4bb528054d96&", raridad: "Especial" },
    { nombre: "Saltador", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486527681273876/1827_sin_titulo_20261018155009.png?ex=6ad68727&is=6ad535a7&hm=2f0f7dfbb73cfe586276a9316079cda427b7e68c92706651029df6470039cd5b&", raridad: "Raro" },
    { nombre: "Corredor", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486527979323452/1827_sin_titulo_20261018155053.png?ex=6ad68727&is=6ad535a7&hm=b662e6a170011281d0f7824b0aaa28127d954739dc4d76c4db2bededf7fa2d28&", raridad: "Común" },
    { nombre: "Luna", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486527312298094/1827_sin_titulo_20261018154726.png?ex=6ad68727&is=6ad535a7&hm=822555fe73ead8887100617c0c0a88b6d95659b321990e5072d1fbd449a3d076&", raridad: "Raro" },
    { nombre: "Plataforma", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486528348426291/1827_sin_titulo_20261018155305.png?ex=6ad68727&is=6ad535a7&hm=b998bd861cab4df2fbcb3b5da41d0650ff721fd46e7d9c64d2040d4c85c10ea9&", raridad: "Común" },
    { nombre: "Burbuja", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486528767725769/1827_sin_titulo_20261018155625.png?ex=6ad68727&is=6ad535a7&hm=0b9243251723bfd4b6b8aee7e5d70ed823bd46f1838f8f22b9ec61764aa5074b&", raridad: "Común" },
    { nombre: "Trampolín", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486529187029022/1827_sin_titulo_20261018155745.png?ex=6ad68727&is=6ad535a7&hm=07b880e4a2424006763c6175ddce222ee2e7fd5edcf053d83953f30cbbd8faae&", raridad: "Raro" },
    { nombre: "Trampa de marea", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486529954709665/1827_sin_titulo_20261018155849.png?ex=6ad68727&is=6ad535a7&hm=6e101abb846e8e7e912075e6ec1584c44e93500a3807c8b9e77a3158420d2ed9&", raridad: "Épico" },
    { nombre: "Ataques Simples", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486529572896768/1827_sin_titulo_20261018155816.png?ex=6ad68727&is=6ad535a7&hm=38433ac3c265b1b97d976397877610d83a278d927e01f062251c08a58bd6728c&", raridad: "Común" },
    { nombre: "Elástico", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486530252378272/1827_sin_titulo_20261018160003.png?ex=6ad68727&is=6ad535a7&hm=57565de945571b0875482b0b73c87665d4c63f99efc91d78259fa83c3d3e75b1&", raridad: "Raro" },
    { nombre: "Toque de Midas", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486530722136175/1827_sin_titulo_20261018160034.png?ex=6ad68727&is=6ad535a7&hm=f2124ce2aaae22fc5356f023b8b1cca3b81385802c4be6f456cf4941a76b83f7&", raridad: "Legendario" },
    { nombre: "Gigante", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486564528361565/1827_sin_titulo_20261018155912.png?ex=6ad68730&is=6ad535b0&hm=30176539b3dfc4f6bdc9986a007944eebec7d59c5a35f7ec96ad7da19f50c013&", raridad: "Épico" },
    { nombre: "Botella de agua", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486564834418708/1827_sin_titulo_20261018160229.png?ex=6ad68730&is=6ad535b0&hm=aaf0bcc2f2a1751d8133d7a6a4284cc618e8f02d83e186be0c6c44e6523275f4&", raridad: "Común" },
    { nombre: "Defensa", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486565128278259/1827_sin_titulo_20261018160335.png?ex=6ad68730&is=6ad535b0&hm=b21e4da6dcc1f0f40bb236a937176cd1434ae3a4f6f5de2f131095b8a8f0da20&", raridad: "Raro" },
    { nombre: "Ofensa", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486565455306752/1827_sin_titulo_20261018160433.png?ex=6ad68730&is=6ad535b0&hm=8a75a4603091141f2c0060d4ba900a802a8969db78e30301fe1709e47c1fdbc5&", raridad: "Raro" },
    { nombre: "Hammer", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486565828595782/1827_sin_titulo_0000-17-02_20261018160524.png?ex=6ad68730&is=6ad535b0&hm=91060ddd5d82730086d10b954c44eee1f13aa7c744e08c388a99c82287a96770&", raridad: "Raro" },
    { nombre: "Tsunami", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486566281445406/1827_sin_titulo_0000-17-02_20261018160613.png?ex=6ad68730&is=6ad535b0&hm=fe6dc09b83ed6cc76de3860de609be3b716a3ff435deca5f58d11a6f98ec87c6&", raridad: "Legendario" }
];

const configsPorServidor = {};
const inventarios = {};
let personajeActual = null;

function getConfig(guildId) {
    if (!configsPorServidor[guildId]) {
        configsPorServidor[guildId] = {
            modo: 'mensajes',
            limiteMensajes: 25,
            contadorActual: 0,
            tiempoMin: 30,
            tiempoMax: 3600,
            canalesPermitidos: [],
            canalesBloqueados: []
        };
    }
    return configsPorServidor[guildId];
}

async function lanzarSwimmerEspecifico(channel, personaje) {
    if (!channel) return;
    personajeActual = personaje || personajesSWF[Math.floor(Math.random() * personajesSWF.length)];

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
    await channel.send({ embeds: [embedSpawn], components: [fila] });
}

const commands = [
    new SlashCommandBuilder().setName('inventario').setDescription('Muestra tus Swimmers atrapados'),
    new SlashCommandBuilder().setName('dex').setDescription('Muestra la lista de todos los Swimmers disponibles'),
    new SlashCommandBuilder().setName('progreso').setDescription('Muestra cuántos mensajes van para el siguiente personaje'),
    
    // Comando /spawnswimmer
    new SlashCommandBuilder()
        .setName('spawnswimmer')
        .setDescription('Comando de moderación para aparecer Swimmers manualmente')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(opt =>
            opt.setName('swimmer')
                .setDescription('Swimmer a aparecer')
                .setRequired(true)
                .addChoices(...personajesSWF.map(p => ({ name: p.nombre, value: p.nombre })))
        )
        .addIntegerOption(opt =>
            opt.setName('amount')
                .setDescription('Cantidad de veces que aparecerá (Opcional)')
                .setRequired(false)
        ),

    // Comando /config con subcomandos
    new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configuración del bot para administradores')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub =>
            sub.setName('mode')
                .setDescription('Cambia el modo de aparición')
                .addStringOption(opt =>
                    opt.setName('mode')
                        .setDescription('Selecciona el modo')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Modo Mensaje', value: 'mensajes' },
                            { name: 'Modo Tiempo', value: 'tiempo' }
                        )
                )
        )
        .addSubcommand(sub =>
            sub.setName('messages')
                .setDescription('Define la cantidad de mensajes entre spawns (10-100)')
                .addIntegerOption(opt =>
                    opt.setName('messages')
                        .setDescription('Cantidad de mensajes (10-100)')
                        .setRequired(true)
                        .setMinValue(10)
                        .setMaxValue(100)
                )
        )
        .addSubcommand(sub =>
            sub.setName('randomtime')
                .setDescription('Define el rango de tiempo aleatorio para apariciones')
                .addIntegerOption(opt =>
                    opt.setName('minortime')
                        .setDescription('Tiempo mínimo en segundos (mínimo 30s)')
                        .setRequired(true)
                        .setMinValue(30)
                )
                .addIntegerOption(opt =>
                    opt.setName('mayortime')
                        .setDescription('Tiempo máximo en segundos (máximo 3600s / 1 hora)')
                        .setRequired(true)
                        .setMaxValue(3600)
                )
        )
        .addSubcommandGroup(group =>
            group.setName('zone')
                .setDescription('Configura zonas/canales permitidos o denegados')
                .addSubcommand(sub =>
                    sub.setName('approved')
                        .setDescription('Canales donde SÍ puede aparecer el bot (separados por coma)')
                        .addStringOption(opt => opt.setName('channel').setDescription('Ejemplo: #general, #chat-bot').setRequired(true))
                )
                .addSubcommand(sub =>
                    sub.setName('denied')
                        .setDescription('Canales donde NO puede aparecer el bot (separados por coma)')
                        .addStringOption(opt => opt.setName('channel').setDescription('Ejemplo: #reglas, #anuncios').setRequired(true))
                )
        )
].map(command => command.toJSON());

client.on('ready', async () => {
    console.log(`¡Bot iniciado como ${client.user.tag}!`);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        console.log('Comandos e interacciones en barra registrados correctamente.');
    } catch (error) {
        console.error(error);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    const config = getConfig(message.guild.id);

    if (config.canalesBloqueados.includes(message.channel.id)) return;
    if (config.canalesPermitidos.length > 0 && !config.canalesPermitidos.includes(message.channel.id)) return;

    if (config.modo === 'mensajes') {
        config.contadorActual++;
        if (config.contadorActual >= config.limiteMensajes) {
            config.contadorActual = 0;
            await lanzarSwimmerEspecifico(message.channel, null);
        }
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.guild) return;
    const config = getConfig(interaction.guild.id);
    const userId = interaction.user.id;

    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'inventario') {
            const lista = inventarios[userId];
            if (!lista || lista.length === 0) {
                return await interaction.reply({ content: "Todavía no has atrapado ningún Swimmer.", ephemeral: true });
            }
            const conteo = {};
            lista.forEach(p => { conteo[p.nombre] = (conteo[p.nombre] || 0) + 1; });
            const texto = Object.entries(conteo).map(([nombre, cant]) => `• **${nombre}** x${cant}`).join('\n');

            const embed = new EmbedBuilder().setTitle(`Inventario de ${interaction.user.username}`).setDescription(texto).setColor('#00ff88');
            return await interaction.reply({ embeds: [embed] });
        }

        if (interaction.commandName === 'dex') {
            const listaDex = personajesSWF.map(p => `• **${p.nombre}** (${p.raridad})`).join('\n');
            const embed = new EmbedBuilder().setTitle('SwF-Dex - Coleccionables').setDescription(listaDex).setColor('#0099ff');
            return await interaction.reply({ embeds: [embed] });
        }

        if (interaction.commandName === 'progreso') {
            if (config.modo === 'tiempo') {
                return await interaction.reply({ content: "El servidor está configurado en **Modo Tiempo** aleatorio.", ephemeral: true });
            }
            return await interaction.reply({ content: `Progreso: **${config.contadorActual}/${config.limiteMensajes}** mensajes.`, ephemeral: true });
        }

        if (interaction.commandName === 'spawnswimmer') {
            const nombreTarget = interaction.options.getString('swimmer');
            const cantidad = interaction.options.getInteger('amount') || 1;

            const personajeSeleccionado = personajesSWF.find(p => p.nombre.toLowerCase() === nombreTarget.toLowerCase());
            if (!personajeSeleccionado) {
                return await interaction.reply({ content: "❌ Swimmer no encontrado.", ephemeral: true });
            }

            await interaction.reply({ content: `✅ Generando **${cantidad}** aparición(es) de **${personajeSeleccionado.nombre}**...`, ephemeral: true });

            for (let i = 0; i < cantidad; i++) {
                await lanzarSwimmerEspecifico(interaction.channel, personajeSeleccionado);
            }
            return;
        }

        if (interaction.commandName === 'config') {
            const subcommandGroup = interaction.options.getSubcommandGroup(false);
            const subcommand = interaction.options.getSubcommand();

            if (subcommand === 'mode') {
                const nuevoModo = interaction.options.getString('mode');
                config.modo = nuevoModo;
                return await interaction.reply({ content: `✅ Modo actualizado a: **${nuevoModo === 'mensajes' ? 'Modo Mensaje' : 'Modo Tiempo'}**`, ephemeral: true });
            }

            if (subcommand === 'messages') {
                const cantidad = interaction.options.getInteger('messages');
                config.limiteMensajes = cantidad;
                return await interaction.reply({ content: `✅ Límite de mensajes actualizado a: **${cantidad}**`, ephemeral: true });
            }

            if (subcommand === 'randomtime') {
                const min = interaction.options.getInteger('minortime');
                const max = interaction.options.getInteger('mayortime');

                if (min >= max) {
                    return await interaction.reply({ content: "❌ El tiempo mínimo debe ser menor al tiempo máximo.", ephemeral: true });
                }

                config.tiempoMin = min;
                config.tiempoMax = max;
                return await interaction.reply({ content: `✅ Rango de tiempo configurado: **${min}s** a **${max}s**.`, ephemeral: true });
            }

            if (subcommandGroup === 'zone') {
                const rawChannels = interaction.options.getString('channel');
                const idsExtraidas = rawChannels.match(/<#(\d+)>/g)?.map(id => id.replace(/[<#>]/g, '')) || [];

                if (subcommand === 'approved') {
                    config.canalesPermitidos = idsExtraidas;
                    return await interaction.reply({ content: `✅ Canales autorizados guardados (${idsExtraidas.length} detectados).`, ephemeral: true });
                }

                if (subcommand === 'denied') {
                    config.canalesBloqueados = idsExtraidas;
                    return await interaction.reply({ content: `✅ Canales denegados guardados (${idsExtraidas.length} detectados).`, ephemeral: true });
                }
            }
        }
    }

    if (interaction.isButton() && interaction.customId === 'btn_catch') {
        if (!personajeActual) {
            return await interaction.reply({ content: "Este Swimmer ya fue atrapado o desapareció.", ephemeral: true });
        }
        const modal = new ModalBuilder().setCustomId('modal_catch').setTitle('¡Atrapa al Swimmer!');
        const campoNombre = new TextInputBuilder().setCustomId('input_nombre').setLabel("¿Cuál es el nombre de este Swimmer?").setStyle(TextInputStyle.Short).setRequired(true);
        modal.addComponents(new ActionRowBuilder().addComponents(campoNombre));
        return await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modal_catch') {
        const respuesta = interaction.fields.getTextInputValue('input_nombre');
        if (!personajeActual) return await interaction.reply({ content: "¡Alguien más lo atrapó antes!", ephemeral: true });

        const nombreValido = respuesta.toLowerCase() === personajeActual.nombre.toLowerCase() || (personajeActual.nombre === "Hammer" && respuesta.toLowerCase() === "martillo");
        if (nombreValido) {
            if (!inventarios[userId]) inventarios[userId] = [];
            inventarios[userId].push(personajeActual);
            const atrapado = personajeActual;
            personajeActual = null;
            await interaction.reply(`¡Felicidades ${interaction.user}! Has atrapado a **${atrapado.nombre}** (${atrapado.raridad}).`);
        } else {
            await interaction.reply({ content: "¡Nombre incorrecto!", ephemeral: true });
        }
    }
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot activo!');
});
server.listen(process.env.PORT || 3000);

client.login(process.env.DISCORD_TOKEN);
