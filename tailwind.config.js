 

module.exports = {  
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { 
      colors: {
        "azul": "#138FCE",
        "cinza": "#838383",
        "cinza-escuro":"#626161",
        "cinza-claro": "#C8CDD1",
        "quase-branco": "#E5E5E5",
        "verde" : "#34AF23",
        "vermelho":"#E2202C",
        "laranja":"#FFA000"
      },
      fontSize:{
        xxs: ['10px', '12px'],
        input:['16px', '16px']
      }
    }, 
  },
  variants: {
    extend: {},
  },
  plugins: [],
}