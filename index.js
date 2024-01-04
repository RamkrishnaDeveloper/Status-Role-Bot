// The Heading Start

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

// The Heading End

 // Status Start
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
      status: "online",
      activity: { name: "For qcdevs.xyz/discord", type: "WATCHING" },
    });
});

// Status End

// Main Code Start
client.on("presenceUpdate", async (oldMember, newMember) => {
            if (!oldMember || !newMember) return;
            const guild = oldMember.guild
            if(oldMember.status !== newMember.status) return
            const roleId = config.roleId;
            const message = config.message;
            const role = guild.roles.cache.get(roleId)
            if (!role || role.deleted) return;
            let status = newMember.activities.map(a => a.state)
            const member = guild.members.cache.get(newMember.user.id);
            if (!member) return;
            if (status[0] != null && status[0].includes(message)) {
                member.roles.add(roleId, 'Support System | QC Devs')
                     const embed = new Discord.MessageEmbed()
                    .setTitle(`Status Added`)
                    .setColor(`#2F3136`)
                    .setFooter(`Made by QC Devs`)
                    .setDescription(`\`${member.user.tag}\` added the status and got the role \`${role.name}\``)
                    client.channels.cache.get(config.logs).send(embed)
            } else {
                if (member.roles.cache.some((r) => r.id === roleId)) {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`Status Removed or Offline`)
                    .setColor(`#2F3136`)
                    .setFooter(`Made by QC Devs`)
                    .setDescription(`\`${role.name}\` revoked from \`${member.user.tag}\``)
                    client.channels.cache.get(config.logs).send(embed)
                    member.roles.remove(roleId, 'Support System | QC Devs')
                }
              }

        
});


// Main Code End

// Login Start

client.login(config.TOKEN);

// Login End
