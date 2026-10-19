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
    { nombre: "Chispas", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486566562603148/1827_sin_titulo_0000-17-02_20261018160811.png?ex=6ad68730&is=6ad535b0&hm=bd2637c7e616549b3a68791f741dbc63459dc3ed22ac9f7e300b4bb528054d96&", raridad: "Especial", valor: 5000 },
    { nombre: "Saltador", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486527681273876/1827_sin_titulo_20261018155009.png?ex=6ad68727&is=6ad535a7&hm=2f0f7dfbb73cfe586276a9316079cda427b7e68c92706651029df6470039cd5b&", raridad: "Raro", valor: 1000 },
    { nombre: "Corredor", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486527979323452/1827_sin_titulo_20261018155053.png?ex=6ad68727&is=6ad535a7&hm=b662e6a170011281d0f7824b0aaa28127d954739dc4d76c4db2bededf7fa2d28&", raridad: "Común", valor: 700 },
    { nombre: "Luna", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486527312298094/1827_sin_titulo_20261018154726.png?ex=6ad68727&is=6ad535a7&hm=822555fe73ead8887100617c0c0a88b6d95659b321990e5072d1fbd449a3d076&", raridad: "Raro", valor: 1000 },
    { nombre: "Plataforma", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486528348426291/1827_sin_titulo_20261018155305.png?ex=6ad68727&is=6ad535a7&hm=b998bd861cab4df2fbcb3b5da41d0650ff721fd46e7d9c64d2040d4c85c10ea9&", raridad: "Común", valor: 700 },
    { nombre: "Burbuja", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486528767725769/1827_sin_titulo_20261018155625.png?ex=6ad68727&is=6ad535a7&hm=0b9243251723bfd4b6b8aee7e5d70ed823bd46f1838f8f22b9ec61764aa5074b&", raridad: "Común", valor: 700 },
    { nombre: "Trampolín", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486529187029022/1827_sin_titulo_20261018155745.png?ex=6ad68727&is=6ad535a7&hm=07b880e4a2424006763c6175ddce222ee2e7fd5edcf053d83953f30cbbd8faae&", raridad: "Raro", valor: 1000 },
    { nombre: "Trampa de marea", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486529954709665/1827_sin_titulo_20261018155849.png?ex=6ad68727&is=6ad535a7&hm=6e101abb846e8e7e912075e6ec1584c44e93500a3807c8b9e77a3158420d2ed9&", raridad: "Épico", valor: 1875 },
    { nombre: "Ataques Simples", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486529572896768/1827_sin_titulo_20261018155816.png?ex=6ad68727&is=6ad535a7&hm=38433ac3c265b1b97d976397877610d83a278d927e01f062251c08a58bd6728c&", raridad: "Común", valor: 700 },
    { nombre: "Elástico", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486530252378272/1827_sin_titulo_20261018160003.png?ex=6ad68727&is=6ad535a7&hm=57565de945571b0875482b0b73c87665d4c63f99efc91d78259fa83c3d3e75b1&", raridad: "Raro", valor: 1000 },
    { nombre: "Toque de Midas", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486530722136175/1827_sin_titulo_20261018160034.png?ex=6ad68727&is=6ad535a7&hm=f2124ce2aaae22fc5356f023b8b1cca3b81385802c4be6f456cf4941a76b83f7&", raridad: "Legendario", valor: 2500 },
    { nombre: "Gigante", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486564528361565/1827_sin_titulo_20261018155912.png?ex=6ad68730&is=6ad535b0&hm=30176539b3dfc4f6bdc9986a007944eebec7d59c5a35f7ec96ad7da19f50c013&", raridad: "Épico", valor: 1875 },
    { nombre: "Botella de agua", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486564834418708/1827_sin_titulo_20261018160229.png?ex=6ad68730&is=6ad535b0&hm=aaf0bcc2f2a1751d8133d7a6a4284cc618e8f02d83e186be0c6c44e6523275f4&", raridad: "Común", valor: 700 },
    { nombre: "Defensa", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486565128278259/1827_sin_titulo_20261018160335.png?ex=6ad68730&is=6ad535b0&hm=b21e4da6dcc1f0f40bb236a937176cd1434ae3a4f6f5de2f131095b8a8f0da20&", raridad: "Raro", valor: 1000 },
    { nombre: "Ofensa", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486565455306752/1827_sin_titulo_20261018160433.png?ex=6ad68730&is=6ad535b0&hm=8a75a4603091141f2c0060d4ba900a802a8969db78e30301fe1709e47c1fdbc5&", raridad: "Raro", valor: 1000 },
    { nombre: "Hammer", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486565828595782/1827_sin_titulo_0000-17-02_20261018160524.png?ex=6ad68730&is=6ad535b0&hm=91060ddd5d82730086d10b954c44eee1f13aa7c744e08c388a99c82287a96770&", raridad: "Raro", valor: 1000 },
    { nombre: "Tsunami", imagen: "https://cdn.discordapp.com/attachments/1556851534573211740/1561486566281445406/1827_sin_titulo_0000-17-02_20261018160613.png?ex=6ad68730&is=6ad535b0&hm=fe6dc09b83ed6cc76de3860de609be3b716a3ff435deca5f58d11a6f98ec87c6&", raridad: "Legendario", valor: 2500 }
];

const configsPorServidor = {};
const balances = {};
const inventarios = {};
const cooldowns = { diario: {}, minas: {}, ruleta: {} };
const buffsSuerte = {};
let personajeActual = null;
const timersTiempo = {};

// Sistema de Tienda con rotación cada 6 horas
let tiendaActual = { items: [], proximoRestock: [], timestampProximo: Date.now() + 6 * 3600 * 1000 };

function generarTiendaItems() {
    const seleccionados = [];
    for (let i = 0; i < 3; i++) {
        const item = personajesSWF[Math.floor(Math.random() * personajesSWF.length)];
        seleccionados.push({ ...item, stock: Math.floor(Math.random() * 3) + 1 });
    }
    return seleccionados;
}

tiendaActual.items = generarTiendaItems();
tiendaActual.proximoRestock = generarTiendaItems();

setInterval(() => {
    if (Date.now() >= tiendaActual.timestampProximo) {
        tiendaActual.items = tiendaActual.proximoRestock;
        tiendaActual.proximoRestock = generarTiendaItems();
        tiendaActual.timestampProximo = Date.now() + 6 * 3600 * 1000;
    }
}, 60000);

function getConfig(guildId) {
    if (!configsPorServidor[guildId]) {
        configsPorServidor[guildId] = {
            modo: 'mensajes',
            limiteMensajes: 25,
            contadorActual: 0,
            tiempoMin: 30,
            tiempoMax: 3600,
            canalesPermitidos: [],
            canalesBloqueados: [],
            ultimoCanalActivo: null
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

function iniciarLoopTiempo(guildId) {
    if (timersTiempo[guildId]) clearTimeout(timersTiempo[guildId]);
    const config = getConfig(guildId);
    if (config.modo !== 'tiempo') return;

    const tiempoEsperaMs = Math.floor(Math.random() * (config.tiempoMax - config.tiempoMin + 1) + config.tiempoMin) * 1000;

    timersTiempo[guildId] = setTimeout(async () => {
        if (config.ultimoCanalActivo && config.modo === 'tiempo') {
            try {
                const canal = await client.channels.fetch(config.ultimoCanalActivo);
                if (canal) await lanzarSwimmerEspecifico(canal, null);
            } catch (e) {
                console.error("Error al spawnear por tiempo:", e);
            }
        }
        iniciarLoopTiempo(guildId);
    }, tiempoEsperaMs);
}

const commands = [
    new SlashCommandBuilder().setName('inventario').setDescription('Muestra tus Swimmers atrapados'),
    new SlashCommandBuilder().setName('dex').setDescription('Muestra la lista de todos los Swimmers disponibles'),
    new SlashCommandBuilder().setName('progreso').setDescription('Muestra cuántos mensajes van para el siguiente personaje'),
    
    // Comandos de Monedas
    new SlashCommandBuilder().setName('saldoburbujas').setDescription('Muestra tu saldo de burbujas disponibles'),
    new SlashCommandBuilder()
        .setName('regaloburbujas')
        .setDescription('Regala burbujas a otro usuario')
        .addUserOption(opt => opt.setName('user').setDescription('Usuario a regalar').setRequired(true))
        .addIntegerOption(opt => opt.setName('cantidad').setDescription('Cantidad de burbujas').setRequired(true).setMinValue(1)),
    new SlashCommandBuilder().setName('recompensadiaria').setDescription('Reclama tu recompensa diaria de burbujas'),

    // Comandos de Tienda
    new SlashCommandBuilder().setName('shop').setDescription('Abre la tienda limitada de Swimmers'),
    new SlashCommandBuilder().setName('nextrestock').setDescription('Muestra lo que viene en el próximo restock (Disponible a 5h o menos)'),

    // Otros minijuegos
    new SlashCommandBuilder().setName('minas').setDescription('Minijuego de minería de minerales con cooldown'),
    new SlashCommandBuilder().setName('ruleta').setDescription('Gira la ruleta semanal de premios'),
    new SlashCommandBuilder()
        .setName('venderswimmer')
        .setDescription('Vende un Swimmer por burbujas (75% de su valor)')
        .addStringOption(opt =>
            opt.setName('swimmer')
                .setDescription('Nombre del Swimmer a vender')
                .setRequired(true)
                .addChoices(...personajesSWF.map(p => ({ name: p.nombre, value: p.nombre })))
        ),

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
        .addIntegerOption(opt => opt.setName('amount').setDescription('Cantidad de veces').setRequired(false)),

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
                .setDescription('Define mensajes entre spawns (10-100)')
                .addIntegerOption(opt => opt.setName('messages').setDescription('Cantidad').setRequired(true).setMinValue(10).setMaxValue(100))
        )
        .addSubcommand(sub =>
            sub.setName('randomtime')
                .setDescription('Define el rango de tiempo aleatorio')
                .addIntegerOption(opt => opt.setName('minortime').setDescription('Mínimo (s)').setRequired(true).setMinValue(30))
                .addIntegerOption(opt => opt.setName('mayortime').setDescription('Máximo (s)').setRequired(true).setMaxValue(3600))
        )
        .addSubcommandGroup(group =>
            group.setName('zone')
                .setDescription('Configura zonas/canales')
                .addSubcommand(sub =>
                    sub.setName('approved')
                        .setDescription('Canales permitidos (separados por coma)')
                        .addStringOption(opt => opt.setName('channel').setDescription('Canales').setRequired(true))
                )
                .addSubcommand(sub =>
                    sub.setName('denied')
                        .setDescription('Canales denegados (separados por coma)')
                        .addStringOption(opt => opt.setName('channel').setDescription('Canales').setRequired(true))
                )
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
    config.ultimoCanalActivo = message.channel.id;

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
    const userId = interaction.user.id;
    const config = getConfig(interaction.guild.id);

    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'saldoburbujas') {
            const saldo = balances[userId] || 0;
            return await interaction.reply({ content: `🫧 Tienes **${saldo}** burbujas en tu cuenta.`, ephemeral: true });
        }

        if (interaction.commandName === 'regaloburbujas') {
            const targetUser = interaction.options.getUser('user');
            const cantidad = interaction.options.getInteger('cantidad');

            if (targetUser.id === userId) {
                return await interaction.reply({ content: "❌ No puedes regalarte burbujas a ti mismo.", ephemeral: true });
            }

            const saldoActual = balances[userId] || 0;
            if (saldoActual < cantidad) {
                return await interaction.reply({ content: `❌ No tienes suficientes burbujas. Tu saldo es **${saldoActual}** 🫧.`, ephemeral: true });
            }

            balances[userId] -= cantidad;
            balances[targetUser.id] = (balances[targetUser.id] || 0) + cantidad;

            return await interaction.reply(`🎁 Has regalado **${cantidad}** 🫧 a ${targetUser}.`);
        }

        if (interaction.commandName === 'recompensadiaria') {
            const ahora = Date.now();
            const ultimoUso = cooldowns.diario[userId] || 0;
            const unDia = 24 * 3600 * 1000;

            if (ahora - ultimoUso < unDia) {
                const restante = Math.ceil((unDia - (ahora - ultimoUso)) / 3600000);
                return await interaction.reply({ content: `⏳ Ya reclamaste tu recompensa hoy. Vuelve en **${restante}** hora(s).`, ephemeral: true });
            }

            const recompensa = Math.floor(Math.random() * 91) + 10;
            balances[userId] = (balances[userId] || 0) + recompensa;
            cooldowns.diario[userId] = ahora;

            return await interaction.reply(`🎉 ¡Has reclamado tu recompensa diaria y recibido **${recompensa}** 🫧!`);
        }

        if (interaction.commandName === 'shop') {
            const tiempoRestanteMs = tiendaActual.timestampProximo - Date.now();
            const horasRestantes = Math.floor(tiempoRestanteMs / 3600000);
            const minutosRestantes = Math.floor((tiempoRestanteMs % 3600000) / 60000);

            const embed = new EmbedBuilder()
                .setTitle(`Limited Shop (Reinicio en ${horasRestantes}h ${minutosRestantes}m)`)
                .setColor('#0099ff');

            const row = new ActionRowBuilder();
            tiendaActual.items.forEach((item, index) => {
                embed.addFields({ name: `${item.nombre} (${item.raridad})`, value: `Precio: **${item.valor}** 🫧\nStock: **${item.stock}**`, inline: true });
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`comprar_item_${index}`)
                        .setLabel(`Comprar ${item.nombre}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(item.stock <= 0)
                );
            });

            return await interaction.reply({ embeds: [embed], components: [row] });
        }

        if (interaction.commandName === 'nextrestock') {
            const tiempoRestanteMs = tiendaActual.timestampProximo - Date.now();
            const horasRestantes = tiempoRestanteMs / 3600000;

            if (horasRestantes > 5) {
                return await interaction.reply({ content: "⏳ Este comando solo funciona cuando faltan **5 horas o menos** para el siguiente restock.", ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setTitle("🔮 Próximo Restock de la Tienda")
                .setColor('#ffaa00');

            tiendaActual.proximoRestock.forEach(item => {
                embed.addFields({ name: `${item.nombre} (${item.raridad})`, value: `Valor: **${item.valor}** 🫧 | Stock: **${item.stock}**`, inline: true });
            });

            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.commandName === 'minas') {
            const ahora = Date.now();
            const ultimoUso = cooldowns.minas[userId] || 0;
            const cooldownMs = 10 * 3600 * 1000;

            if (ahora - ultimoUso < cooldownMs) {
                const horas = Math.ceil((cooldownMs - (ahora - ultimoUso)) / 3600000);
                return await interaction.reply({ content: `⏳ Tus picos están cansados. Vuelve a minar en **${horas}** hora(s).`, ephemeral: true });
            }

            cooldowns.minas[userId] = ahora;

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('btn_minar').setLabel('⛏️ ¡Minar (0/75 clicks)!').setStyle(ButtonStyle.Primary)
            );

            // Guardamos sesión temporal en memoria
            client.sesionesMinas = client.sesionesMinas || {};
            client.sesionesMinas[userId] = { clicks: 0, ultimosMinerales: [] };

            return await interaction.reply({ content: "⛏️ **¡Sesión de minería iniciada!** Haz clic en el botón de abajo hasta 75 veces.", components: [row], ephemeral: true });
        }

        if (interaction.commandName === 'ruleta') {
            const ahora = Date.now();
            const ultimoUso = cooldowns.ruleta[userId] || 0;
            const cooldownRuleta = 7 * 24 * 3600 * 1000;

            if (ahora - ultimoUso < cooldownRuleta) {
                return await interaction.reply({ content: "⏳ La ruleta solo se puede girar una vez cada **7 días**.", ephemeral: true });
            }

            cooldowns.ruleta[userId] = ahora;

            const premios = [
                { emoji: "🔴", desc: "+10% de suerte en /Minar por 1 día", tipo: "suerte" },
                { emoji: "🔶", desc: "500 Burbujas", tipo: "burbujas", valor: 500 },
                { emoji: "⭐", desc: "Personaje raro aleatorio", tipo: "swimmer", raridad: "Raro" },
                { emoji: "💚", desc: "750 Burbujas", tipo: "burbujas", valor: 750 },
                { emoji: "🌀", desc: "Personaje épico aleatorio", tipo: "swimmer", raridad: "Épico" },
                { emoji: "💷", desc: "1250 Burbujas", tipo: "burbujas", valor: 1250 }
            ];

            const premioGana = premios[Math.floor(Math.random() * premios.length)];
            let textoPremio = premioGana.desc;

            if (premioGana.tipo === 'burbujas') {
                balances[userId] = (balances[userId] || 0) + premioGana.valor;
            } else if (premioGana.tipo === 'swimmer') {
                const filtrados = personajesSWF.filter(p => p.raridad === premioGana.raridad);
                const ganado = filtrados[Math.floor(Math.random() * filtrados.length)];
                if (!inventarios[userId]) inventarios[userId] = [];
                inventarios[userId].push(ganado);
                textoPremio += ` (**${ganado.nombre}**)`;
            } else if (premioGana.tipo === 'suerte') {
                buffsSuerte[userId] = ahora + 24 * 3600 * 1000;
            }

            return await interaction.reply(`🎰 ¡La ruleta giró y cayó en **${premioGana.emoji}**! Premio obtenido: **${textoPremio}**.`);
        }

        if (interaction.commandName === 'venderswimmer') {
            const nombreTarget = interaction.options.getString('swimmer');
            const lista = inventarios[userId] || [];
            const index = lista.findIndex(p => p.nombre.toLowerCase() === nombreTarget.toLowerCase());

            if (index === -1) {
                return await interaction.reply({ content: "❌ No tienes ese Swimmer en tu inventario.", ephemeral: true });
            }

            const swimmerVendido = lista.splice(index, 1)[0];
            const valorVenta = Math.floor(swimmerVendido.valor * 0.75);
            balances[userId] = (balances[userId] || 0) + valorVenta;

            return await interaction.reply(`💰 Has vendido a **${swimmerVendido.nombre}** por **${valorVenta}** 🫧 (75% de su valor).`);
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

        if (interaction.customId.startsWith('comprar_item_')) {
            const index = parseInt(interaction.customId.split('_')[2]);
            const item = tiendaActual.items[index];
            const saldo = balances[userId] || 0;

            if (item.stock <= 0) {
                return await interaction.reply({ content: "❌ Este artículo ya no tiene stock.", ephemeral: true });
            }
            if (saldo < item.valor) {
                return await interaction.reply({ content: `❌ No tienes suficientes burbujas. Necesitas **${item.valor}** 🫧.`, ephemeral: true });
            }

            balances[userId] -= item.valor;
            item.stock--;

            if (!inventarios[userId]) inventarios[userId] = [];
            inventarios[userId].push({ nombre: item.nombre, imagen: item.imagen, raridad: item.raridad, valor: item.valor });

            return await interaction.update({ content: `✅ ¡Has comprado a **${item.nombre}** por **${item.valor}** 🫧!` });
        }

        if (interaction.customId === 'btn_minar') {
            client.sesionesMinas = client.sesionesMinas || {};
            const sesion = client.sesionesMinas[userId];
            if (!sesion || sesion.clicks >= 75) {
                return await interaction.reply({ content: "❌ Sesión de minería finalizada.", ephemeral: true });
            }

            sesion.clicks++;

            const tieneBuff = (buffsSuerte[userId] || 0) > Date.now();

            const minerales = [
                { nombre: "Carbón", recompensa: 2, prob: 20 },
                { nombre: "Cobre", recompensa: 10, prob: 10 },
                { nombre: "Rubí", recompensa: 25, prob: 5 },
                { nombre: "Esmeralda", recompensa: 30, prob: 4.4 },
                { nombre: "Amatista", recompensa: 50, prob: 3 },
                { nombre: "Bronce", recompensa: 100, prob: 2 },
                { nombre: "Plata", recompensa: 250, prob: 1 },
                { nombre: "Oro", recompensa: 500, prob: 0.75 },
                { nombre: "Diamante", recompensa: 1000, prob: 0.25 },
                { nombre: "Antimateria", recompensa: 10000, prob: 0.000000067 }
            ];

            // Filtrar los que no estén en los últimos 7 clics
            const disponibles = minerales.filter(m => !sesion.ultimosMinerales.includes(m.nombre));
            const minEncontrado = disponibles[Math.floor(Math.random() * disponibles.length)] || minerales[0];

            sesion.ultimosMinerales.push(minEncontrado.nombre);
            if (sesion.ultimosMinerales.length > 7) sesion.ultimosMinerales.shift();

            balances[userId] = (balances[userId] || 0) + minEncontrado.recompensa;

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('btn_minar')
                    .setLabel(`⛏️ Minar (${sesion.clicks}/75 clicks)`)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(sesion.clicks >= 75)
            );

            return await interaction.update({ 
                content: `⛏️ ¡Golpe #${sesion.clicks}! Encontraste **${minEncontrado.nombre}** (+${minEncontrado.recompensa} 🫧).`, 
                components: [row] 
            });
        }
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