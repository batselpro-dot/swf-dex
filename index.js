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
    PermissionFlagsBits
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
let canalUltimoSpawn = null;

function getConfig(guildId) {
    if (!configsPorServidor[guildId]) {
        configsPorServidor[guildId] = {
            modo: 'mensajes', // 'mensajes' o 'tiempo'
            limiteMensajes: 25,
            contadorActual: 0,
            tiempoMin: 30, // segundos
            tiempoMax: 36000, // 10 horas en segundos
            canalesPermitidos: [], // Si está vacío, permite todos excepto los bloqueados
            canalesBloqueados: []
        };
    }
    return configsPorServidor[guildId];
}

async function lanzarSwimmer(channel) {
    if (!channel) return;
    personajeActual = personajesSWF[Math.floor(Math.random() * personajesSWF.length)];
    canalUltimoSpawn = channel.id;

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
    new SlashCommandBuilder()
        .setName('config')
        .setDescription('Comandos de configuración para administradores')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub =>
            sub.setName('me').setDescription('Abre el panel completo de configuración del bot')
        )
].map(command => command.toJSON());

client.on('ready', async () => {
    console.log(`¡Bot iniciado como ${client.user.tag}!`);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        console.log('Comandos registrados correctamente.');
    } catch (error) {
        console.error(error);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    const config = getConfig(message.guild.id);

    // Verificar filtros de canales
    if (config.canalesBloqueados.includes(message.channel.id)) return;
    if (config.canalesPermitidos.length > 0 && !config.canalesPermitidos.includes(message.channel.id)) return;

    if (config.modo === 'mensajes') {
        config.contadorActual++;
        if (config.contadorActual >= config.limiteMensajes) {
            config.contadorActual = 0;
            await lanzarSwimmer(message.channel);
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

        if (interaction.commandName === 'config' && interaction.options.getSubcommand() === 'me') {
            const embedConfig = new EmbedBuilder()
                .setTitle('⚙️ Panel de Configuración - SwF-Dex')
                .setDescription('Configura el comportamiento del bot en este servidor desde los botones inferiores:')
                .addFields(
                    { name: 'Modo de Aparición', value: config.modo.toUpperCase(), inline: true },
                    { name: 'Límite de Mensajes', value: `${config.limiteMensajes}`, inline: true },
                    { name: 'Rango de Tiempo (Aleatorio)', value: `${config.tiempoMin}s - ${config.tiempoMax}s`, inline: true }
                )
                .setColor('#ffaa00');

            const row1 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('cfg_cambiar_modo').setLabel('Cambiar Modo (Msjs/Tiempo)').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('cfg_editar_limite').setLabel('Editar Límite Mensajes').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('cfg_editar_tiempo').setLabel('Configurar Tiempos (30s - 10h)').setStyle(ButtonStyle.Primary)
            );

            return await interaction.reply({ embeds: [embedConfig], components: [row1], ephemeral: true });
        }
    }

    if (interaction.isButton()) {
        if (interaction.customId === 'btn_catch') {
            if (!personajeActual) {
                return await interaction.reply({ content: "Este Swimmer ya fue atrapado o desapareció.", ephemeral: true });
            }
            const modal = new ModalBuilder().setCustomId('modal_catch').setTitle('¡Atrapa al Swimmer!');
            const campoNombre = new TextInputBuilder().setCustomId('input_nombre').setLabel("¿Cuál es el nombre de este Swimmer?").setStyle(TextInputStyle.Short).setRequired(true);
            modal.addComponents(new ActionRowBuilder().addComponents(campoNombre));
            return await interaction.showModal(modal);
        }

        if (interaction.customId === 'cfg_cambiar_modo') {
            config.modo = config.modo === 'mensajes' ? 'tiempo' : 'mensajes';
            return await interaction.update({ content: `✅ Modo cambiado exitosamente a: **${config.modo.toUpperCase()}**`, components: [] });
        }

        if (interaction.customId === 'cfg_editar_limite') {
            const modal = new ModalBuilder().setCustomId('modal_limite').setTitle('Configurar Límite de Mensajes');
            const input = new TextInputBuilder().setCustomId('input_limite_mensajes').setLabel('Cantidad de mensajes para spawn:').setStyle(TextInputStyle.Short).setValue(config.limiteMensajes.toString()).setRequired(true);
            modal.addComponents(new ActionRowBuilder().addComponents(input));
            return await interaction.showModal(modal);
        }

        if (interaction.customId === 'cfg_editar_tiempo') {
            const modal = new ModalBuilder().setCustomId('modal_tiempo').setTitle('Configurar Rango de Tiempo (Segundos)');
            const inputMin = new TextInputBuilder().setCustomId('input_t_min').setLabel('Mínimo en segundos (Mín. 30)').setStyle(TextInputStyle.Short).setValue(config.tiempoMin.toString()).setRequired(true);
            const inputMax = new TextInputBuilder().setCustomId('input_t_max').setLabel('Máximo en segundos (Máx. 36000)').setStyle(TextInputStyle.Short).setValue(config.tiempoMax.toString()).setRequired(true);
            modal.addComponents(new ActionRowBuilder().addComponents(inputMin), new ActionRowBuilder().addComponents(inputMax));
            return await interaction.showModal(modal);
        }
    }

    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'modal_catch') {
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

        if (interaction.customId === 'modal_limite') {
            const nuevoVal = parseInt(interaction.fields.getTextInputValue('input_limite_mensajes'));
            if (!isNaN(nuevoVal) && nuevoVal > 0) {
                config.limiteMensajes = nuevoVal;
                await interaction.reply({ content: `✅ Límite de mensajes actualizado a: **${nuevoVal}**`, ephemeral: true });
            } else {
                await interaction.reply({ content: "❌ Número inválido.", ephemeral: true });
            }
        }

        if (interaction.customId === 'modal_tiempo') {
            const tMin = parseInt(interaction.fields.getTextInputValue('input_t_min'));
            const tMax = parseInt(interaction.fields.getTextInputValue('input_t_max'));
            if (!isNaN(tMin) && !isNaN(tMax) && tMin >= 30 && tMax <= 36000 && tMin < tMax) {
                config.tiempoMin = tMin;
                config.tiempoMax = tMax;
                await interaction.reply({ content: `✅ Tiempos actualizados: Mínimo **${tMin}s**, Máximo **${tMax}s**.`, ephemeral: true });
            } else {
                await interaction.reply({ content: "❌ Valores inválidos. Recuerda: Mínimo 30 segundos y máximo 10 horas (36000s).", ephemeral: true });
            }
        }
    }
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot activo!');
});
server.listen(process.env.PORT || 3000);

client.login(process.env.DISCORD_TOKEN);
