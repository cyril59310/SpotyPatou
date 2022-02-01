const catDetails = require("../../data/categoryDetails.json");
const categories = require("../../data/categories.json");
const config = require("../../../config.json");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "help",
  description: "Affiche le menu des commandes",
  category: "utility",
  options: [{
    name: "commande",
    type: "STRING",
    description: "la commande que vous recherchez",
    required: false
  }],
  execute(bot, interaction) {
    const arg = interaction.options.getString("command", false);

    if (arg) {
      const cmd = bot.commands.get(arg);
      if (!cmd)
        return bot.say.warnMessage(interaction, `Aucune commande nommée \`${arg}\` n\'a été trouvée .`);

      const cmdUsage = cmd.usage ? `\/${cmd.name} ${cmd.usage}` : `\/${cmd.name}`;

      const embed = bot.say.baseEmbed(interaction)
        .setAuthor(`${cmd.category} command: ${cmd.name}`, bot.user.displayAvatarURL())
        .addField(`${cmdUsage}`, `${cmd.description ?? "Non spécifié"}`)
        .setFooter("[] : facultatif • <> : obligatoire • | : ou");

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }

    const cates = [];
    for (let i = 0; i < categories.length; i++) {
      const category = bot.commands.filter(({ category }) => category === categories[i])
        .map(({ name }) => name);
      cates.push(category);
    }

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor("Commnandes d'aide", bot.user.displayAvatarURL())
      .setFooter(`Type '\/help <commande>' pour plus de détails sur une commande`);

    for (let j = 0; j < cates.length; j++) {
      const name = catDetails[categories[j]];

      if (categories[j] === "botowner" && !config.owners.includes(interaction.user.id)) continue;

      embed.addField(`${name}`, `\`\`\`${cates[j].join(", ")}\`\`\``);
    };

    const button1 = new MessageButton()
      .setLabel("Support")
      .setStyle("LINK")
      .setURL(`${config.supportServer}`);

    const button2 = new MessageButton()
      .setLabel("Invite")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=applications.commands%20bot`);

    const row = new MessageActionRow().addComponents([button1, button2]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};