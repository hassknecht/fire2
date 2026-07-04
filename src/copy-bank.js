const COPY_BY_TYPE = {
  text: [
    '繁文缛节皆化虚无，还你自由清净。',
    '它已经烧完了。你不用再替它燃烧。',
    '这段话到此为止，你可以松一口气了。',
    '纸面上的重量，已归还给火。'
  ],
  file: [
    '这份负担已归档为灰烬。',
    '文件已退场，心跳可以归位。',
    '它不再占用你的今天。',
    '这团麻烦已归于灰烬。'
  ],
  sketch: [
    '乱线散开，心也散开。',
    '这一笔焦躁，已经有了出口。',
    '画完，烧掉，呼吸回来。',
    '线团已松，火替你收尾。'
  ],
  avatar: [
    '此事已退场，你继续发光。',
    '你的宇宙已恢复通透。',
    '这个角色已离开你的剧情。',
    '边界重新点亮，今天归你。'
  ]
};

export function getFeedbackCopy(type, seed = Date.now()) {
  const copies = COPY_BY_TYPE[type] ?? COPY_BY_TYPE.text;
  const index = Math.abs(Math.trunc(seed)) % copies.length;
  return copies[index];
}
