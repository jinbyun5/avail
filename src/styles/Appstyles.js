// ─────────────────────────────────────────────────────────────
//   Typography Reference (for Figma / documentation):
//   Hero    — 48px / 500 / lh 100% = 48px  / ls -2px   = -4.2%
//   H1      — 24px / 500 / lh 120% = 29px  / ls -0.3px = -1.3%
//   H2      — 18px / 500 / lh 128% = 23px  / ls -0.2px = -1.1%
//   bodyMed — 16px / 500 / lh 150% = 24px  / ls 0
//   bodyReg — 16px / 400 / lh 160% = 26px  / ls 0
//   smallMed— 13px / 500 / lh 150% = 20px  / ls 0
//   smallReg— 13px / 400 / lh 150% = 20px  / ls 0
//   label   — 11px / 500 / lh 136% = 15px  / ls +0.8px = +7.3%
// ─────────────────────────────────────────────────────────────

export const text = {
  hero:     { fontFamily: 'Montserrat_500Medium',  fontSize: 48, lineHeight: 48, letterSpacing: -2 },
  h1:       { fontFamily: 'Montserrat_500Medium',  fontSize: 24, lineHeight: 29, letterSpacing: -0.3 },
  h2:       { fontFamily: 'Montserrat_500Medium',  fontSize: 18, lineHeight: 23, letterSpacing: -0.2 },
  bodyMed:  { fontFamily: 'Montserrat_500Medium',  fontSize: 16, lineHeight: 24 },
  bodyReg:  { fontFamily: 'Montserrat_400Regular', fontSize: 16, lineHeight: 26 },
  smallMed: { fontFamily: 'Montserrat_500Medium',  fontSize: 13, lineHeight: 20 },
  smallReg: { fontFamily: 'Montserrat_400Regular', fontSize: 13, lineHeight: 20 },
  label:    { fontFamily: 'Montserrat_500Medium',  fontSize: 11, lineHeight: 15, letterSpacing: 0.8 },
};

export const colors = {

  // Brand colors
  brand: {
    hoverLight:   '#E0F4F4',
    mutedOnDark:  '#7ECECE',
    accent:       '#0E9090',
    hoverAccent:  '#0A6B6B',
    primary:      '#0F3D3E',
    pressed:      '#061E1F',
  },

  // Neutral scales
  neutral: {
    appBg:         '#F0FAFA',
    cardInputNav:  '#FEFDFD',
    divider:       '#CBD5E1',
    placeholder:   '#94A3B8',
    secondaryText: '#64748B',
    primaryText:   '#1E293B',
  },

  // Status colors
  status: {
    success:        '#E7F6EE',
    successOutline: '#64C896',
    successText:    '#185A3C',

    warning:        '#FEF8E9',
    warningOutline: '#F3C13A',
    warningText:    '#795E11',

    error:          '#FEF0F0',
    errorOutline:   '#EE9595',
    errorText:      '#8E1A1A',

    info:           '#CDF7F7',
    infoOutline:    '#73C7C7',
    infoText:       '#1B3F40',
  },

  // Category label colors
  label: {
    tax:          '#FDF0F7',
    taxText:      '#7B1884',

    studentAid:     '#EBF0FF',
    studentAidText: '#3A349E',

    // Changed this to health, from workplace
    health:      '#FFF6EA',
    healthText:  '#9C442A',

    housing:        '#DBF2F2',
    housingText:    '#186767',
  },

  // Added this, lemme me know what you guys thing
  benefitCards: {
    taxCard:        '#E0F4F4',

    studentAidCard: '#E0F0F9',

    healthCard:     '#FEF2F2',
  },

};