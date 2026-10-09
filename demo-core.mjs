// Standalone teaching rules, not the production router or singing implementation.
export const lyric = '把晚风装进口袋，留一半给明天。';
export const scenes = {
 work:{title:'先在意作品，再自然唱出来。',copy:'听新歌时先聊整体感受。聊到可唱的原词，再把完整乐句作为一个小彩蛋。',rule:'对话说了什么 ≠ 任务做完了什么',detail:'生成期间有轻量状态；结果必须归属原作品与当前有效请求。这里仅模拟卡片送达，不含音频。'},
 writing:{title:'一起想，也要一起写。',copy:'用户回应创作方向后，小乐给出具体的一句。得到认可，再记进歌词本。',rule:'候选句不等于已保存的歌词',detail:'尚未认可的句子可以修改或放下。歌词与正常聊天融在一起，不另起机械的“试一句”。'},
 mlog:{title:'平静与热烈，在同一刻转身。',copy:'先确认画面和音乐都存在合适反差，再发出邀约。用户同意之后，才制作音乐日记。',rule:'多个画面 + 一个连续音乐片段',detail:'剪辑长度取决于素材；画面反差与音乐转折同步。示意时间轴不是对真实素材的分析。'}
};
export function completeUnit(quote,units){const norm=s=>s.replace(/[\s，。！？、/]/g,'');return units.find(u=>u.aligned&&norm(u.text).includes(norm(quote))&&norm(quote).length>0)||null;}
export function canDeliver(job,current,delivered){return job.epoch===current.epoch&&job.work===current.work&&!delivered.has(job.key);}
export function contrastEligible({videoContrast,musicContrast,continuousMusic,syncOffsetMs}){return videoContrast&&musicContrast&&continuousMusic&&Math.abs(syncOffsetMs)<=100;}
export function acceptLine(candidate,approved){return approved?candidate:null;}
