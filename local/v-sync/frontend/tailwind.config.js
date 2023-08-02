/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'img_1': "url(/src/assets/VSYNC_bg.jpg)",
        'img_2': "url(/src/assets/VAANI_bg.jpg)",
        'img_3': "url(/src/assets/VERVE_bg.jpg)",
        'img_4': "url(/src/assets/VIBES_bg.jpg)",
        // 'card_friends': 'url(/src/assets/friends.png)',
        // 'card_couple': 'url(/src/assets/couple.png)',
        // 'card_multiplayer': 'url(/src/assets/group.png)',
        'card_friends': 'url(/src/assets/friends_card.jpg)',
        'card_couple': 'url(/src/assets/couples_card.jpg)',
        'card_multiplayer': 'url(/src/assets/multiplayer_card.jpg)',
        'dashboard_wallppr': 'url(/src/assets/tiles-1846980_1920.jpg)',
        'couple_bg': 'url(/src/assets/couple_bg.png)',
        'friend_bg': 'url(/src/assets/family_bg.png)',
        'vsync_logo': 'url(/src/assets/vsync_logo.png)',
        'instruction': 'url(/src/assets/vsync_instructions.jpg)'
      }
    },


    colors: {
      ...colors,
      bg_nav: "#693CCA",
      light_bg_clr: '#FFECD3',
      bg_clr: '#090920',
      purple_1: '#8d85d4',
      purple_2: '#a69adb',
      purple_3: '#c9b2e4',
      pink_1: '#FF6BD6',
      pink_2: '#FFB0FE',
      clr_1: '#1B335F',
      gameCard: '#E9A7EF',

      bg: '#BBDCEF',
      img: '#407BFF',
      Theme_skin: '#D8E9F8',
      footer: '#0072C0',
      icons: '#005767'
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      ysa: ['Ysabeau', 'sans-serif'],
      noto: ['Noto Serif', 'serif']
    }
  },
  plugins: [],
}
