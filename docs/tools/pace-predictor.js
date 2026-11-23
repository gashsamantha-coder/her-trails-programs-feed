(function(){var s=document.createElement('style');s.textContent="#htpp,#htfp{max-width:1000px;margin:0 auto;padding:8px 16px 48px;font-family:'Work Sans',system-ui,sans-serif;font-size:15px;line-height:1.7;color:#555}#htpp *,#htfp *{box-sizing:border-box}#htpp b,#htfp b{color:#1d1d1d}.pp-card,.fp-card,.pp-bench,.fp-box,.fp-hero,.pp-cues>div{background:#fdfaf3;border:1px solid #e8dccb;border-radius:12px;padding:20px;margin-bottom:16px}.pp-grid,.fp-grid{display:flex;flex-wrap:wrap;gap:16px}.pp-f,.fp-f{flex:1 1 220px;display:flex;flex-direction:column;gap:6px}.pp-f>span,.fp-f>span{font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:600;color:#c45c33}#htpp input,#htpp select,#htfp input,#htfp select{width:100%;padding:12px;border:1px solid #e2d9d2;border-radius:8px;background:#fff;font:inherit;color:#1d1d1d;min-height:46px}.pp-time,.fp-time{display:flex;align-items:center;gap:8px}.pp-time input,.fp-time input{text-align:center}.pp-hint,.pp-small,.fp-small{font-size:13px;color:#666;margin:12px 0 0}.pp-err,.fp-err{color:#a33a1f;font-weight:600;margin-top:8px}.pp-err:empty,.fp-err:empty{display:none}.pp-note{background:#fff3ee;border:1px solid #c45c33;border-radius:12px;padding:16px;margin-bottom:16px}.pp-stats,.fp-stats{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}.pp-stats>div,.fp-stats>div{flex:1 1 160px;background:#1d1d1d;border-radius:12px;padding:16px;text-align:center}.pp-stats b,.fp-stats b{display:block;color:#fff;font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:600}.pp-stats span,.fp-stats span{color:#bbb;font-size:12px}.pp-bench b,.fp-box b,.pp-cues b{display:block;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#c45c33;margin-bottom:6px}.pp-bench p,.fp-box p,.pp-cues p{margin:0 0 8px}.fp-hero{background:#fff3ee;border-color:#c45c33}.fp-hero h3{margin:0 0 8px;font-family:'Playfair Display',Georgia,serif;font-weight:600;color:#1d1d1d;font-size:clamp(19px,2.6vw,23px)}.fp-hero p{margin:0}.pp-tablewrap,.fp-tablewrap{overflow-x:auto;margin-bottom:16px}.pp-table,.fp-table{width:100%;border-collapse:collapse;background:#fdfaf3;border:1px solid #e8dccb;border-radius:12px;font-size:14px}.pp-table th,.fp-table th{background:#1d1d1d;color:#fff;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;text-align:left;padding:12px}.pp-table td,.fp-table td{padding:12px;border-top:1px solid #e8dccb;vertical-align:top}.pp-table small,.fp-table small{display:block;color:#666;font-size:12px}.pp-noterow td{background:#f8f5f2;color:#555;font-size:13px;border-top:0}.pp-tag{display:inline-block;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:600;background:#edf3ec;color:#597b52}.pp-climb{background:#fff3ee;color:#c45c33}.pp-descent{background:#ede6e1;color:#1d1d1d}.pp-technical{background:#faebdf;color:#a3481f}.pp-cues,.fp-cols{display:flex;flex-wrap:wrap;gap:16px}.pp-cues>div,.fp-cols>.fp-box{flex:1 1 280px}.fp-wide{width:100%}.fp-box ol{margin:0 0 8px;padding-left:20px}.fp-inline{max-width:240px}.pp-actions,.fp-actions{display:flex;flex-wrap:wrap;gap:12px;margin:16px 0}.pp-btn,.fp-btn{display:inline-block;background:#c45c33;color:#fff!important;border:2px solid #c45c33;border-radius:8px;padding:12px 20px;font:600 14px 'Work Sans',sans-serif;text-decoration:none;cursor:pointer}.pp-ghost,.fp-ghost{background:transparent;color:#c45c33!important}@media print{.pp-actions,.fp-actions,.pp-card,.fp-card{display:none}}";document.head.appendChild(s)})();
var EVENTS = {
    "scc100": { name: "Surf Coast Century 100km", tier: 1, terrain: "Trail",
      segments: [
        {name:"Start to Anglesea", km:12.5, idx:0.95, type:"runnable", note:"Flat, fast opening on wide beach-adjacent trail. The field goes out hard here; hold your goal pace even if it feels too easy."},
        {name:"Anglesea to Binna Burra", km:18, idx:1.35, type:"climb", note:"The longest sustained climbing of the day, rooted and rolling rather than one clean pitch. Settle into a hiking rhythm early rather than trying to run every rise."},
        {name:"Binna Burra to Point Addis", km:16, idx:1.25, type:"technical", note:"Rocky, technical coastal singletrack. Pick clean lines rather than forcing pace; this is where ankles roll."},
        {name:"Point Addis to Winki Pop", km:14, idx:0.85, type:"descent", note:"Fast, runnable downhill with fresh legs still on board. Tempting to fly, but save some of this speed advantage for later rather than spending it all now."},
        {name:"Winki Pop to Fairhaven", km:15.5, idx:1.05, type:"mixed", note:"Mixed rolling terrain that doesn't clearly favour climbers or runners. Stay even and use it to reset before the next climb."},
        {name:"Fairhaven to Moggs Creek", km:12, idx:1.30, type:"climb", note:"Second major climbing block, arriving with real fatigue on board. This is where under-fuelled runners fall apart."},
        {name:"Moggs Creek to Finish", km:12, idx:0.95, type:"descent", note:"Fast finish into the event village. Fine to push here since it's the last section, but only if the climbs haven't already emptied the tank."}
      ],
      cue: {
        start: "Rooted climbs and rolling terrain between Anglesea and Binna Burra trick you into overspending early. Settle into your goal RPE before that first climb rather than banking time.",
        mistakes: "Running the fast Point Addis to Winki Pop and Moggs Creek to Finish downhills too hard to make up time lost on the climbs. This is the single biggest cause of late-race fade on this course."
      },
      fade: {
        source: "2024 race, all 121 female finishers, official checkpoint splits.",
        headline: "This race is won and lost in the final 30km.",
        points: [
          "From Distillery Creek (68km) to the finish, the mid-pack slows around 5 to 8 percent more than the top-10 percent of women do, on top of already being slower. The front-runners' real edge is not a fast start, it is holding form late.",
          "The field stays closest to the front on the runnable sections: through Point Addis (10km) and either side of halfway (43 to 58km). Bank patience here, not time.",
          "So the takeaway is to run the first half well within yourself, because the back third from 68km to 100km is where places are actually made."
        ]
      }},
    "scc50": { name: "Surf Coast Century 50km", tier: 2, terrain: "Trail",
      segments: [
        {name:"0 to 5km (start)", km:5, idx:0.95, type:"runnable", note:"Steady, rolling start. Past data shows the field runs the first 5km around 25 percent faster than they hold later, and that early surge is the number one cause of the late fade. Go out deliberately easy."},
        {name:"5 to 10.7km", km:5.7, idx:0.9, type:"runnable", note:"Runnable and flat. Settle into rhythm and fuel here; 'effortless' early is over-spending you pay for later."},
        {name:"10.7 to 14.5km", km:3.8, idx:1.03, type:"mixed", note:"Gently rising rolling terrain. Ease the effort up rather than forcing the pace to hold your number."},
        {name:"14.5 to 19.6km", km:5.1, idx:0.94, type:"runnable", note:"Fast, flat section. Stay relaxed and keep turnover, but don't bank time you'll want later on the climbs."},
        {name:"19.6 to 24.4km", km:4.8, idx:1.12, type:"climb", note:"The first real climbing block. Drop to the terrain-adjusted pace and climb by effort, not the clock."},
        {name:"24.4 to 29.4km", km:5, idx:1.09, type:"mixed", note:"Rolling terrain right after the climb. Steady; don't chase pace to make up what the climb seemed to cost."},
        {name:"29.4 to 34.1km", km:4.7, idx:0.97, type:"mixed", note:"Continued rolling, slightly easier. Stay patient and save your legs for the climbs still to come."},
        {name:"34.1 to 36.7km", km:2.6, idx:1.12, type:"climb", note:"Short, sharp climb and the single biggest field-fade zone on this course: the typical finisher slows about 48 percent more than the front-pack here. Get fuel and fluid in BEFORE it, then power-hike the steep."},
        {name:"36.7 to 44km", km:7.3, idx:1.11, type:"climb", note:"The longest grind of the day. Break it into chunks and hold effort; this is where the climbs cluster and races unravel."},
        {name:"44 to 47.6km", km:3.6, idx:0.94, type:"runnable", note:"Legs back under you on flatter ground. Lift gently now that the climbing is done."},
        {name:"47.6 to 49.6km", km:2, idx:0.76, type:"descent", note:"Fast downhill finish. If you protected your quads on the climbs, this is where you make up places, let it run controlled."}
      ],
      cue: {
        start: "Past data shows the field runs the first 5km about 25 percent faster than they hold later, and that early surge is the number one cause of the late fade. Go out deliberately easy.",
        mistakes: "Over-running the early flats and arriving at the 34 to 44km climbing block depleted. The biggest field-fade zone is 34 to 37km; protect your fuelling and your legs into it."
      }},
    "buffalo100": { name: "Buffalo Stampede 100km", tier: 1, terrain: "Alpine",
      segments: [
        {name:"Emily's Spur", km:1.7, idx:1.3, type:"climb", note:"Steep, short, and immediate, no warm-up. Hike from the first step rather than trying to run it out."},
        {name:"Water Reserve Track", km:20, idx:1.05, type:"mixed", note:"Long, rolling fire trail. Settle into rhythm here; it's the best section to lock in nutrition and hydration before the harder terrain ahead."},
        {name:"Snake Ridge", km:18, idx:1.25, type:"climb", note:"Sustained climbing with exposed ridge running. Keep effort controlled, not maximal, since The Big Walk and Dingo Ridge are still ahead."},
        {name:"Buckland Valley", km:3, idx:0.95, type:"runnable", note:"Short flat valley crossing. A brief reset before the course turns brutal again."},
        {name:"Keatings Ridge", km:2.5, idx:1.3, type:"climb", note:"Short, sharp climb that catches tired legs off guard right after the Big Walk descent. Respect it despite the short distance."},
        {name:"The Big Walk", km:10, idx:1.35, type:"climb", note:"The defining climb of the race, long and relentless. Hike with purpose; this is not a section to try to run any part of."},
        {name:"Mount Buffalo Plateau", km:28, idx:1.15, type:"mixed", note:"Long undulating plateau section. Manage effort conservatively; it's longer than it looks on paper and comes mid-race."},
        {name:"Dingo Ridge", km:6.3, idx:1.35, type:"climb", note:"The hottest, most exposed climb on the course. Fuel and hydrate fully before you reach it, not during it."},
        {name:"Middle Track", km:5, idx:1.2, type:"technical", note:"Loose, technical descent arriving on already-tired legs. Foot placement matters more than speed here."},
        {name:"Bakers Gully and Bright Streets", km:8, idx:0.85, type:"descent", note:"Fast run home into town. If you've paced the climbs well this is free time; if not, it will feel endless."}
      ],
      cue: {
        start: "Emily's Spur climbs immediately. Do not chase the field up it; settle into a hiking rhythm before you've even properly warmed up.",
        mistakes: "Treating the Big Walk descent as free speed. It arrives right after sustained climbing, and pushing it hard invites cramping on the Keatings Ridge rolling section that follows."
      }},
    "tarawera50": { name: "Tarawera 50km", tier: 1, terrain: "Trail",
      segments: [
        {name:"Te Puia to Puarenga", km:10.5, idx:0.95, type:"runnable", note:"Fast, runnable opener. The field goes out quick; hold your number even if it feels conservative."},
        {name:"Puarenga to Green Lake", km:10.9, idx:0.9, type:"runnable", note:"More fast forest trail. Good section to settle into rhythm and start fuelling on schedule."},
        {name:"Green Lake to Blue Lake", km:13.8, idx:0.9, type:"runnable", note:"Scenic, flat lakeside running. Easy to get comfortable and drift off your target pace here, check your watch."},
        {name:"Blue Lake to Redwoods", km:9.8, idx:0.95, type:"mixed", note:"Terrain starts to roll more. A small effort increase is normal; don't chase the pace you were holding on the lakes."},
        {name:"Redwoods to Sulphur Flats", km:4, idx:1.05, type:"mixed", note:"Short mixed section late in the race when legs are tired. This is where the course's 'runnable' reputation stops helping you."},
        {name:"Sulphur Flats to Village Green", km:3, idx:0.85, type:"descent", note:"Fast finish into the village. Only push if you haven't already spent your legs on the flat sections earlier."}
      ],
      cue: {
        start: "This course is unusually runnable for an ultra, with little mandatory hiking. That's an invitation to go out too fast through Puarenga; resist it.",
        mistakes: "Treating the whole course as flat because it's 'runnable.' Cumulative fatigue still catches unprepared runners in the final few kilometres into the Village Green finish."
      }},
    "uta22": { name: "UTA 22km", tier: 2, terrain: "Technical",
      segments: [
        {name:"QVH to Emergency Aid Station", km:13.1, idx:1.1, type:"technical", note:"Rolling technical singletrack from the gun, no flat warm-up. Ease in for the first kilometre before settling into pace."},
        {name:"Emergency Aid Station to Scenic World (Furber Steps)", km:8.8, idx:1.35, type:"climb", note:"951 steps straight up to the finish. Save something specific for this; it's not a section you can run through on empty."}
      ],
      cue: {
        start: "You start at QVH, straight into rolling technical terrain with no warm-up flat section. Ease into the first kilometre before settling into pace.",
        mistakes: "Emptying the tank on the approach to Emergency Aid Station and having nothing left for the steps."
      }},
    "uta50": { name: "UTA 50km", tier: 2, terrain: "Technical",
      segments: [
        {name:"Start to Fairmont Resort", km:18.4, idx:1.05, type:"mixed", note:"Rolling opening section. Settle in quickly since there's no flat warm-up; this establishes the rhythm for the rest of the day."},
        {name:"Fairmont Resort to QVH", km:10.9, idx:1.25, type:"climb", note:"Mentally the hardest climb of the day because it comes mid-race, well before the finish feels close. Treat it as a real effort, not a recovery section."},
        {name:"QVH to Emergency Aid Station", km:13.3, idx:1.1, type:"technical", note:"Rolling technical terrain heading toward the final climb. Manage effort here rather than emptying the tank."},
        {name:"Emergency Aid Station to Scenic World (Furber Steps)", km:8.8, idx:1.35, type:"climb", note:"951 steps to the finish. Every UTA distance ends here, save something specific for it."}
      ],
      cue: {
        start: "You join the course at Fairmont Resort already deep into race rhythm. Settle in quickly rather than easing in, since there's no long flat opener.",
        mistakes: "Underestimating the Fairmont Resort to QVH climb because it comes mid-race. It's one of the tougher sustained efforts on the course, not a recovery section."
      },
      fade: {
        source: "2024 race, top finishers vs the median band of the 788 female finishers, official SportSplits checkpoint splits.",
        headline: "The back-half climbs are where the field cracks.",
        points: [
          "The mid-pack holds the fast opening well, then loses the most time, relative to the leaders, on the two long back-half climbs: the grind up to Queen Victoria Hospital and the climb from there to the escarpment finish. The leaders climb these strong; the field over-slows on them.",
          "The opening from the start down to Gordon Falls is where the field stays closest to the front. Run it within yourself, don't spend your legs on the runnable early kilometres.",
          "Save something specific for the Kedumba valley climb and the final push to Furber Steps. That back section decides your finish."
        ]
      }},
    "uta100": { name: "UTA 100km", tier: 2, terrain: "Technical",
      segments: [
        {name:"Scenic World to Tarros Ladders", km:13.8, idx:1.2, type:"technical", note:"Technical ladders and stairs within the first 14km. Early adrenaline pulls people out faster than goal effort here; resist it."},
        {name:"Tarros to Foggy Knob", km:10, idx:1.1, type:"mixed", note:"Rolling mid-course terrain. Good section to settle into a sustainable long-day rhythm."},
        {name:"Foggy Knob to Six Foot Track Outbound", km:13.5, idx:0.95, type:"runnable", note:"More runnable than the sections around it. Use it to bank nutrition, not pace."},
        {name:"Six Foot Track to Water Point", km:8.4, idx:1.05, type:"mixed", note:"Undulating approach into the Coxs River valley. Manage effort conservatively before the big climb ahead."},
        {name:"Water Point to Katoomba Aquatic Centre", km:10.5, idx:1.35, type:"climb", note:"Widely regarded as the hardest sustained climb on the course, out of the Coxs River valley. Budget extra time and fuel specifically for this."},
        {name:"Katoomba to Fairmont Resort", km:12.1, idx:1.05, type:"mixed", note:"Rolling terrain that looks like recovery on paper but isn't. The field typically loses time here to poor fuelling, not steep gradient."},
        {name:"Fairmont Resort to QVH", km:11, idx:1.25, type:"climb", note:"Second major climbing effort with real fatigue on board. Treat it with the same respect as the Coxs River climb."},
        {name:"QVH to Emergency Aid Station", km:13.2, idx:1.1, type:"technical", note:"Rolling technical terrain heading toward the finish. This is where the race is often decided since Furber Steps still waits."},
        {name:"Emergency Aid Station to Scenic World (Furber Steps)", km:8.8, idx:1.35, type:"climb", note:"951 steps after 92 kilometres. Everything before this should be run with this exact climb in mind."}
      ],
      cue: {
        start: "Scenic World to Tarros Ladders arrives inside the first 14 kilometres. Don't let early adrenaline pull you through it faster than goal effort.",
        mistakes: "Treating the Katoomba to Fairmont and Fairmont to QVH rolling sections as recovery. They're where the field typically loses the most time to poor fuelling, not on the steepest climbs."
      },
      fade: {
        source: "2024 race, top finishers vs the median band of the 240 female finishers, official SportSplits checkpoint splits.",
        headline: "This is a climber's fade course.",
        points: [
          "The mid-pack loses the most time, relative to the leaders, on the big climbs: out of the Aquatic Centre (Katoomba) up to Gordon Falls, and the late grind from QVH toward the finish. The leaders' real edge is climbing strong when tired, not running fast early.",
          "They also over-slow on the early technical descent from Narrow Neck into the valley. Control that descent rather than hammering it, it costs the field more than it looks.",
          "The field holds closest to the front on the runnable Six Foot Track and the opening fire trail. Run those well within yourself and save your legs for the climbs that actually decide the race."
        ]
      }},
    "buffalo20": { name: "Buffalo Stampede 20km", tier: 2, terrain: "Alpine",
      segments: [
        {name:"Pioneer Park to Mystic Bike Park", km:3, idx:1.0, type:"runnable", note:"Short flat opener. Don't burn matches here; Emily's Spur arrives almost immediately after."},
        {name:"Emily's Spur Climb", km:1.7, idx:1.35, type:"climb", note:"Steep and immediate. Hike it; there is no easing into this course."},
        {name:"Water Reserve Track", km:3, idx:1.05, type:"mixed", note:"Brief rolling recovery section between two harder efforts."},
        {name:"Middle Track to Bakers Gully", km:4, idx:1.25, type:"technical", note:"Technical, rocky descent. Foot placement over speed; a fall here costs more than a cautious pace."},
        {name:"Bakers Gully to Breen Road", km:2.5, idx:0.9, type:"descent", note:"Fast section, but the Breen Road and Clearspot climbs follow immediately after, don't spend everything here."},
        {name:"Breen Road Climb", km:2, idx:1.2, type:"climb", note:"Short, sharp climb right after a fast descent. Control your transition rather than sprinting into it."},
        {name:"Clearspot Climb", km:2.58, idx:1.35, type:"climb", note:"The crux of the course, arriving late. This is where a fast start gets punished."},
        {name:"Clearspot Descent to Town", km:2, idx:1.2, type:"technical", note:"Technical descent to the finish. Stay controlled; it's not the place to try to make up time on tired legs."}
      ],
      cue: {
        start: "Emily's Spur Climb comes almost immediately after Mystic Bike Park. There's no easing into this course; be ready to climb from kilometre three.",
        mistakes: "Sprinting the Bakers Gully to Breen Road downhill and paying for it on the Breen Road and Clearspot climbs that follow immediately after."
      }},
    "buffalo42": { name: "Buffalo Stampede 42.2km", tier: 2, terrain: "Alpine",
      segments: [
        {name:"Chalet to Monolith Track Start", km:2, idx:0.95, type:"runnable", note:"Short flat opener before the technical terrain begins."},
        {name:"Monolith Track", km:2.5, idx:1.1, type:"technical", note:"Technical singletrack early in the race. Good place to test footing while legs are still fresh."},
        {name:"Lake Catani Section", km:1.5, idx:0.85, type:"runnable", note:"Brief flat section around the lake. Use it to settle nutrition before the Underground River Track."},
        {name:"Underground River Track", km:2.5, idx:1.25, type:"technical", note:"Technical terrain front-loaded early in this course. Don't let it rattle your rhythm; harder ground is still ahead."},
        {name:"Big Walk Descent", km:9.5, idx:0.85, type:"descent", note:"Drops roughly 1,000 metres and arrives early. Tempting to fly down, but you'll pay for it on Keatings Ridge that follows."},
        {name:"Keatings Ridge", km:6, idx:1.05, type:"mixed", note:"Rolling terrain right after the big descent. This is where overcooked quads from the descent start to show."},
        {name:"Buckland Valley Road", km:3, idx:0.95, type:"runnable", note:"Short flat valley road. A brief reset before the climbing resumes."},
        {name:"Dingo Ridge Climb", km:6.29, idx:1.35, type:"climb", note:"The defining climb of the course: steep, sustained, and fully exposed to sun. Fuel and hydrate before you reach it."},
        {name:"Clearspot to Eagle Peak", km:1.5, idx:1.3, type:"climb", note:"Short, sharp climb arriving with real fatigue after Dingo Ridge. Respect it despite the short distance."},
        {name:"Water Reserve / Middle Track", km:2, idx:1.2, type:"technical", note:"Technical terrain on tired legs late in the race. Slow down and place your feet deliberately."},
        {name:"Bakers Gully to Bright", km:3.6, idx:0.85, type:"descent", note:"Fast run home if you've paced the climbs well; otherwise it will feel like the longest 3.6km of the day."}
      ],
      cue: {
        start: "The Big Walk Descent drops roughly 1,000 metres and arrives relatively early. Control it; it's tempting to fly down and you'll regret it on Keatings Ridge.",
        mistakes: "Treating the Big Walk Descent as recoverable free speed. The pounding costs you legs you need for Dingo Ridge later."
      }},
    "tarawera100": { name: "Tarawera 100km", tier: 2, terrain: "Trail",
      segments: [
        {name:"Firmin Field to Titoki", km:13.7, idx:1.2, type:"climb", note:"Real climbing in the opener despite this course's reputation for runnability. Don't mistake 'runnable' for 'flat' this early."},
        {name:"Titoki to Outlet", km:12.9, idx:1.05, type:"mixed", note:"Rolling forest trail. Settle into a sustainable 100km rhythm here."},
        {name:"Outlet to Otamuri", km:14.1, idx:1.0, type:"mixed", note:"Balanced terrain, neither a section to push nor one to fully recover on. Hold steady effort."},
        {name:"Otamuri to Rotoiti", km:10.6, idx:0.95, type:"runnable", note:"More runnable terrain. Good place to bank nutrition rather than pace."},
        {name:"Rotoiti to Okataina", km:5.1, idx:1.2, type:"climb", note:"Short but real climbing effort mid-race. Manage it conservatively; the longest segment on the course follows immediately."},
        {name:"Okataina to Millar", km:15.1, idx:1.1, type:"mixed", note:"The longest single segment on the course. Pacing discipline matters most here since fatigue and terrain compound together."},
        {name:"Millar to Tikitapu (Blue Lake)", km:12, idx:0.95, type:"runnable", note:"Runnable lakeside terrain. Easy to drift off your number here, check your watch, not just how you feel."},
        {name:"Tikitapu to Redwoods", km:9.8, idx:1.1, type:"technical", note:"Technical single-track arriving after 85 kilometres of accumulated fatigue. Respect it more than the distance alone suggests."},
        {name:"Redwoods to Village Green (Finish)", km:7.1, idx:0.85, type:"descent", note:"Fast finish if you've paced the earlier lakeside sections properly; punishing if you banked time there instead."}
      ],
      cue: {
        start: "The Firmin Field to Titoki opener includes real climbing despite this course's reputation for runnability. Don't mistake 'runnable' for 'flat' this early.",
        mistakes: "Banking time on the lakeside runnable sections early. The course's late technical section punishes anyone who arrives there already depleted."
      }},
    "kosci50": { name: "Kosci 50km", tier: 2, terrain: "Mountain",
      segments: [
        {name:"Thredbo to Bullocks Flat", km:17.5, idx:1.05, type:"mixed", note:"Deceptively undulating along the Thredbo River despite looking flat on the profile. Don't assume easy just because the grade looks gentle."},
        {name:"Bullocks Flat to Ngarigo Campground", km:7.5, idx:0.95, type:"runnable", note:"More runnable terrain. Settle into rhythm and fuel on schedule before the terrain changes again."},
        {name:"Ngarigo Campground to Village Green", km:11.3, idx:0.95, type:"runnable", note:"Continued runnable terrain. Good section to bank consistent splits."},
        {name:"Village Green to Eagles Nest", km:10, idx:1.3, type:"climb", note:"The psychological and physical crux: a steep late climb up ski slope terrain. Pace everything before it with this climb specifically in mind."},
        {name:"Eagles Nest to Finish (Friday Flat)", km:3.7, idx:0.85, type:"descent", note:"Steep technical descent to the finish. Demands legs you haven't already spent, arrive at Eagles Nest with something left."}
      ],
      cue: {
        start: "You start climbing along the Thredbo River almost immediately. This is deceptively undulating, not flat, despite the gentle-looking grade.",
        mistakes: "Arriving at Eagles Nest already depleted. The steep technical descent that follows demands legs you haven't already spent."
      }},
    "kosci100": { name: "Kosci 100km", tier: 2, terrain: "Mountain",
      segments: [
        {name:"Thredbo to Charlotte Pass Resort", km:16.2, idx:1.3, type:"climb", note:"Long, exposed opening climb. Settle into a hiking rhythm rather than trying to run the gradient this early."},
        {name:"Charlotte Pass Resort to Lookout (Kosci Summit)", km:23.6, idx:1.25, type:"climb", note:"Sits above 2,200 metres, genuine altitude for an Australian race. Effort will feel harder than the gradient alone suggests."},
        {name:"Lookout to Guthega Base Camp", km:9.6, idx:1.2, type:"descent", note:"Long technical descent off the high plateau. Control your legs; you've got 70km still to come."},
        {name:"Guthega Base Camp to Perisher Ski Tube", km:12.2, idx:1.05, type:"mixed", note:"Rolling mid-race terrain. Good place to reset and refocus on fuelling."},
        {name:"Perisher Ski Tube to Bullocks Flat", km:12.4, idx:0.9, type:"runnable", note:"More runnable terrain. Bank consistent splits rather than pushing pace."},
        {name:"Bullocks Flat to Ngarigo Campground", km:7.5, idx:0.95, type:"runnable", note:"Continued runnable terrain, similar demand to the 50km course's equivalent section."},
        {name:"Ngarigo Campground to Village Green", km:11.3, idx:0.95, type:"runnable", note:"Steady runnable terrain before the final crux climb."},
        {name:"Village Green to Eagles Nest", km:10.2, idx:1.3, type:"climb", note:"Arrives after roughly 103 kilometres. This is where the race is decided for most runners, the same crux climb the 50km field faces, but on far more tired legs."},
        {name:"Eagles Nest to Finish (Thredbo)", km:3.5, idx:0.85, type:"descent", note:"Technical descent to the finish line. Only push if you've managed the altitude and the crux climb well."}
      ],
      cue: {
        start: "The first climb toward Charlotte Pass Resort is long and exposed. Settle into a hiking rhythm rather than trying to run the gradient.",
        mistakes: "Underestimating the cumulative effect of altitude on the high plateau. It adds aerobic cost that doesn't show up in the elevation profile the way a steep pitch would."
      }},
    "gpt50": { name: "GPT 50km (Grampians Peaks Trail)", tier: 2, terrain: "Technical",
      segments: [
        {name:"Start to GAR Trailhead", km:15.5, idx:1.3, type:"climb", note:"Sustained climbing in the first 15 kilometres. Treat it as the first of two major efforts, not a warm-up."},
        {name:"GAR Trailhead to Mt Difficult Rd", km:20, idx:1.25, type:"technical", note:"Technical and rocky, the crux of the course. Budget more time here than the distance alone suggests."},
        {name:"Mt Difficult Rd to Halls Gap (Finish)", km:14, idx:0.9, type:"descent", note:"Runnable descent to the finish. Only free speed if the technical crux hasn't already cost you legs."}
      ],
      cue: {
        start: "The climb to GAR Trailhead is sustained and comes in the first 15 kilometres. Approach it as the first of two major efforts, not a warm-up.",
        mistakes: "Rushing the technical crux section to bank time before the runnable descent into Halls Gap. It's where falls and rolled ankles most often end a race."
      }},
    "gpt100mile": { name: "GPT 100 Mile Staged Solo (Grampians Peaks Trail)", tier: 2, terrain: "Technical",
      segments: [
        {name:"N1: Mt Zero to Barigar (Mt Stapylton)", km:12.1, idx:1.15, type:"technical", note:"The trail opens on the iconic rocky Stapylton sandstone in the north. As a staged solo, treat each day as its own even-effort race, but manage the technical footing from the start; you have twelve more stages to run."},
        {name:"N2: Barigar to Gar (Mt Difficult 806m)", km:11.3, idx:1.2, type:"climb", note:"The first big climb of the trail, up Mt Difficult (Gar). Hike the sustained pitches by effort; the northern ranges are relentlessly rocky."},
        {name:"N3: Gar to Werdug (Mt Difficult Range ridgeline)", km:14, idx:1.15, type:"technical", note:"Exposed, technical ridgeline along the Mt Difficult Range. Foot placement over pace; this is slow, committing terrain."},
        {name:"N4: Werdug to Halls Gap (Lake Wartook Lookout)", km:13, idx:1.05, type:"mixed", note:"Rolling descent off the northern range down to Halls Gap, the trail's midpoint hub. A chance to reset, refuel and check your body before the central peaks."},
        {name:"C1: Halls Gap to Bugiga (The Pinnacle 715m)", km:8.9, idx:1.2, type:"climb", note:"The famous Pinnacle climb straight out of Halls Gap. Short but steep and rocky; power-hike it rather than racing it."},
        {name:"C2: Bugiga to Barri-Yalug (Mt Rosea 1,009m)", km:14.7, idx:1.25, type:"climb", note:"Over Mt Rosea, some of the most technical, boulder-strewn trail on the whole route. Slow, deliberate, hands-on in places."},
        {name:"C3: Barri-Yalug to Duwul (Mt William 1,167m, highest)", km:13.2, idx:1.3, type:"climb", note:"The climb to Mt William, the highest point in the Grampians and the crux stage of the traverse. Pace everything around arriving here with legs left to climb."},
        {name:"C4: Duwul to Durd Durd (Mt William range)", km:14.5, idx:1.15, type:"mixed", note:"High, exposed running across the Mt William range. Manage fuel and heat; you're deep into the traverse and the terrain stays committing."},
        {name:"C5: Durd Durd to Yarram", km:11.9, idx:1.05, type:"mixed", note:"A slightly easier linking stage as the trail heads south. Bank consistent effort and recover where the terrain allows."},
        {name:"S1: Yarram to Wannon (Mt Nelson 819m)", km:11.1, idx:1.1, type:"mixed", note:"Into the southern Serra Range over Mt Nelson. The character shifts to long rolling ridgelines; hold steady effort."},
        {name:"S2: Wannon to Djardji-djawara (Serra Range, longest)", km:16.3, idx:1.15, type:"technical", note:"The longest stage, along the exposed Serra Range. Deep fatigue plus distance; break it into chunks and stay on top of fuel and water."},
        {name:"S3: Djardji-djawara to Mud-Dadjug (Mt Abrupt 822m)", km:8.1, idx:1.2, type:"climb", note:"Short but sharp over Mt Abrupt (Mud-Dadjug), the dramatic southern peak. Save something for this climb; the finish is close but not free."},
        {name:"S4: Mud-Dadjug to Dunkeld (Mt Sturgeon 582m, finish)", km:14.8, idx:1.05, type:"mixed", note:"The final stage over Mt Sturgeon and down to Dunkeld. Rolling descent to the southern end of the trail; if you've paced the traverse well, run it home."}
      ],
      cue: {
        start: "This is the full 164km Grampians Peaks Trail traverse run as a staged solo, Mt Zero in the north to Dunkeld in the south. Treat each stage as its own even-effort race, and pace the whole thing around arriving at the Mt William crux (stage 7) with legs left to climb.",
        mistakes: "Racing the early northern stages on the technical Stapylton and Mt Difficult rock and arriving at the central peaks (Rosea, Mt William) with nothing left. On a staged traverse, consistency across days beats a fast start every time."
      }},
    "nikemel": { name: "Nike Melbourne Marathon 42.2km", tier: 2, terrain: "Road",
      segments: [
        {name:"CBD Start to St Kilda Road", km:8, idx:0.95, type:"runnable", note:"Crowd energy and a downhill start tempt you faster than goal pace. Run your own numbers from kilometre one."},
        {name:"St Kilda Road to Albert Park Lake Loop", km:8, idx:1.0, type:"runnable", note:"Flat, controlled section. Settle into goal pace and lock it in before the exposed coastal stretch."},
        {name:"Beach Road Coastal Out-and-Back", km:16, idx:0.95, type:"runnable", note:"The longest uninterrupted stretch, most exposed to wind and heat. Even splits matter more here than anywhere else on the course."},
        {name:"Return via Botanic Gardens", km:6.7, idx:1.0, type:"mixed", note:"Comes late enough to test focus more than fitness. Small form breakdowns compound here."},
        {name:"Final Approach to MCG (Finish)", km:3.5, idx:0.95, type:"runnable", note:"Final kilometres into the MCG. Only push if you haven't already spent your reserve on Beach Road."}
      ],
      cue: {
        start: "This is a road marathon: resist the pace the crowd energy tempts you into on St Kilda Road. Run your own numbers from kilometre one.",
        mistakes: "Starting faster than goal pace because the road feels easy underfoot early. That surplus effort compounds well before the MCG finish."
      }},
    "rollercoaster46": { name: "Rollercoaster 46km", tier: 2, terrain: "Trail",
      segments: [
        {name:"Kalorama to Observatory Track", km:6, idx:1.25, type:"climb", note:"The Observatory Track climb starts almost from the gun in the ferny Dandenong forest. This is a double-loop course, so settle into a hiking rhythm rather than attacking, you run this same terrain in reverse on tired legs."},
        {name:"Observatory Track to Burkes Lookout", km:5, idx:1.15, type:"mixed", note:"Rolling ridge running up to Burkes Lookout. Keep effort even; the roller-coaster profile swings between short climbs and dips constantly."},
        {name:"Burkes Lookout to Zig Zag descent", km:6, idx:0.85, type:"descent", note:"The Zig Zag Track is a fast, technical downhill. Fun on fresh legs, but don't trash your quads, you have a full second lap to run."},
        {name:"Zig Zag to Kalorama (Lap 1 end)", km:6, idx:1.0, type:"mixed", note:"Rolling return to the event village to complete lap one. Refuel here; the second lap is the same loop reversed and it bites harder."},
        {name:"Lap 2 reversed: Kalorama up Zig Zag", km:6, idx:1.2, type:"climb", note:"Now you climb what you descended. The Zig Zag in reverse is a grind on legs already 23km in. Hike it with purpose."},
        {name:"Zig Zag to Burkes Lookout (reversed)", km:5, idx:1.1, type:"mixed", note:"Rolling ridge again, in reverse. Mentally the hardest part; the terrain feels different and the fatigue is real."},
        {name:"Observatory Track descent (reversed)", km:6, idx:0.9, type:"descent", note:"The Observatory climb reversed becomes a descent home. Controlled speed, tired legs make this more technical than it looks."},
        {name:"Final run to Kalorama finish", km:6, idx:1.0, type:"mixed", note:"Rolling run back to Kalorama Reserve. If you paced the first lap with restraint, this is where you move up the field."}
      ],
      cue: {
        start: "The Observatory Track climb starts almost immediately, and this is a double loop, so what you run now you run again in reverse. Bank nothing on lap one.",
        mistakes: "Hammering the Zig Zag descent on lap one and having wrecked quads for the same terrain climbing in reverse on lap two. The second loop is where this race is won."
      }},
    "guzzler50": { name: "The Guzzler 50km (Glass Half Full)", tier: 2, terrain: "Trail",
      segments: [
        {name:"Start to Walkabout Creek (CP1)", km:18, idx:1.05, type:"mixed", note:"A long opening leg on Brisbane's Mt Coot-tha fire trails and single track to the first checkpoint at Walkabout Creek (18km). Rolling and relentless; settle in and fuel early, there is over 2,100m of climbing across the day."},
        {name:"Walkabout Creek to McAfees Lookout (CP2)", km:6, idx:1.2, type:"climb", note:"The climb up to McAfees Lookout. Shorter but steep, run it by effort and cap your heart rate rather than chasing pace."},
        {name:"McAfees Lookout to Gold Creek Reservoir (CP3)", km:8, idx:1.05, type:"mixed", note:"Includes the Hell Hole Hustle, a sharp 3.3km dip of about 243m down and 176m back up. Control the descent, then hike the climb out. CP3 at Gold Creek has a 3pm cut-off, keep moving."},
        {name:"Gold Creek Reservoir to Finish", km:20, idx:1.1, type:"climb", note:"The long 20km run home past the second reservoir, with the day's fatigue compounding. This is where the race is decided; save something for the rolling climbs in this final third."}
      ],
      cue: {
        start: "This course front-loads an 18km leg before the first checkpoint. Don't let fresh legs and fire trails pull you out too fast; there is over 2,100m of climbing and a long back half.",
        mistakes: "Treating the first 18km to Walkabout Creek as easy because it is runnable, then having nothing for the McAfees climb and the long 20km grind home from Gold Creek."
      }},
    "twobays56": { name: "Two Bays Trail Run 56km", tier: 2, terrain: "Trail",
      segments: [
        {name:"Cape Schanck to Bushrangers Bay", km:6, idx:1.1, type:"technical", note:"The course starts at Cape Schanck on scenic but technical coastal trail past Bushrangers Bay. Ease into the rocky, sandy footing rather than forcing pace early."},
        {name:"Bushrangers Bay to Greens Bush", km:10, idx:1.0, type:"mixed", note:"Undulating national park and forest, the runnable heart of the course. Settle into rhythm and fuel; you cover this ground twice."},
        {name:"Greens Bush to Arthurs Seat", km:8, idx:1.05, type:"mixed", note:"Rolling terrain building toward the Arthurs Seat high point. Manage effort; the big descent and, later, the big climb are both still ahead."},
        {name:"Arthurs Seat descent to Dromana (turnaround)", km:4, idx:0.85, type:"descent", note:"A steep drop from Arthurs Seat down to sea level at Dromana, where you ring the bell and turn around. Control this; every metre you descend here you climb straight back up."},
        {name:"Dromana up Arthurs Seat (return)", km:4, idx:1.3, type:"climb", note:"The defining climb of the day: straight back up Arthurs Seat from sea level, now at halfway on tired legs. Hike it steadily rather than trying to run the gradient."},
        {name:"Arthurs Seat to Greens Bush (return)", km:8, idx:1.0, type:"mixed", note:"Rolling return through the forest. The runnable terrain that felt easy outbound now tests your fuelling discipline."},
        {name:"Greens Bush to Bushrangers Bay (return)", km:10, idx:1.0, type:"mixed", note:"The long undulating return leg. Stay mentally engaged; this is where the field drifts off pace without noticing."},
        {name:"Bushrangers Bay to Cape Schanck finish", km:6, idx:1.05, type:"technical", note:"The technical coastal trail again, now on tired legs into the Cape Schanck finish. Foot placement over speed to the line."}
      ],
      cue: {
        start: "You start at Cape Schanck and run out to Dromana before turning back, so the Arthurs Seat descent you enjoy on the way out becomes the climb that defines your race on the return. Bank patience early.",
        mistakes: "Flying down the Arthurs Seat descent to Dromana, then finding you've spent the legs you need to climb it straight back up at halfway. That return climb is the crux."
      }},
    "sydneymarathon": { name: "Sydney Marathon 42.2km", tier: 2, terrain: "Road",
      segments: [
        {name:"Start to North Sydney", km:9, idx:1.05, type:"mixed", note:"A rolling opening through the CBD and up over the northern approaches. It feels flat on fresh legs but there is quiet climbing here. Sit on goal effort rather than goal pace and let the field pull you out too fast."},
        {name:"Harbour Bridge crossing", km:2, idx:1.1, type:"climb", note:"The iconic climb up and over the Sydney Harbour Bridge. The gradient is gentle but sustained and comes early enough that overcooking it costs you the back half. Ease the effort up, take in the view, do not surge."},
        {name:"North Sydney back to the east", km:10, idx:0.95, type:"runnable", note:"A generally downhill and flat run back across the water and out toward the eastern suburbs. This is where you settle into marathon rhythm and lock in your fuelling cadence."},
        {name:"Centennial Park and the east", km:12, idx:1.0, type:"runnable", note:"Undulating parkland and city streets through the middle of the race. Nothing steep, but this is the stretch where discipline on pace and gels decides whether the last 10km holds together."},
        {name:"ANZAC Bridge and run-in", km:5, idx:1.15, type:"climb", note:"The sting in the tail: the ANZAC Bridge climb arrives deep in the race when the legs are heavy. Shorten your stride, hold effort steady over the arch, then use the descent off it to carry momentum."},
        {name:"Finish at the Opera House", km:4.2, idx:0.95, type:"runnable", note:"A largely flat, fast finish down to the Opera House forecourt. If you have paced the bridges honestly, this is where you get to spend what is left."}
      ],
      cue: {
        start: "This is a road marathon with two decisive bridges, the Harbour Bridge early and the ANZAC Bridge late. Run the first half on effort, not adrenaline, so the ANZAC climb at the end is a challenge and not a wall.",
        mistakes: "Treating the flat-looking opening and the Harbour Bridge as free speed, then meeting the ANZAC Bridge with nothing left. The whole race is set up by how patiently you take the first 21km."
      }},
    "taraweraT21": { name: "Tarawera Ultra-Trail T21 (23km)", tier: 2, terrain: "Trail",
      segments: [
        {name:"Blue Lake loop", km:5.5, idx:1.0, type:"mixed", note:"The race opens with the loop around Lake Tikitapu (Blue Lake) on smooth lakeside trail. It is runnable and inviting, which is exactly why you should hold something back here."},
        {name:"Redwoods and forestry roads", km:8, idx:1.05, type:"mixed", note:"Rolling native bush, towering redwoods and wide forestry road. The gentle undulation is where you build a steady, efficient rhythm rather than chasing splits."},
        {name:"Toward Sulphur Point", km:5, idx:1.0, type:"runnable", note:"Trail and parkland trending back toward Rotorua past the thermal landscape and steam vents at Sulphur Point. Keep it smooth and start thinking about a strong close."},
        {name:"Run-in to the Village Green", km:4.5, idx:0.95, type:"runnable", note:"A flat, fast finish through town to the Village Green. On a course this runnable, a controlled first half lets you genuinely race the last few kilometres."}
      ],
      cue: {
        start: "T21 is a runnable, welcoming point-to-point from Blue Lake to downtown Rotorua with only around 400m of climbing. The whole race rewards even effort and a finish you can push, not a fast, excited start.",
        mistakes: "Going out hard on the easy Blue Lake loop because it feels effortless, then fading on the forestry roads. On runnable terrain the temptation to bank time early is the main trap."
      }},
    "loftysrevenge50": { name: "Lofty's Revenge 50km", tier: 2, terrain: "Trail",
      segments: [
        {name:"Felixstow to Black Hill", km:16.1, idx:0.95, type:"runnable", note:"A smooth, almost flat start along Linear Park beside the River Torrens before the Aqueduct Trail near Highbury. This is the most runnable leg by far, so protect your legs and do not spend the climbing muscles you need later."},
        {name:"Black Hill to Norton Summit", km:19.5, idx:1.3, type:"climb", note:"The engine room of the race: the longest and most demanding climbing section as the course grinds up into the Adelaide Hills. Settle into a sustainable power-hike and run rhythm and accept that this leg is slow by design."},
        {name:"Norton Summit to Mt Lofty", km:14.6, idx:1.2, type:"climb", note:"The final push to the Mt Lofty Summit finish, still climbing overall on tired legs. Break it into aid-station-sized chunks and keep fuelling; the summit is the prize and it comes at the very end."}
      ],
      cue: {
        start: "Lofty's Revenge is a point-to-point that saves almost all of its 1800m of climbing for the second half and finishes on top of Mt Lofty. The flat, fast opening along the Torrens is a trap if you race it.",
        mistakes: "Banking time on the runnable first 16km, then unravelling on the long Black Hill to Norton Summit climb. Arriving at the base of the hills with fresh legs is the entire game."
      }},
    "heysendeepcreek50": { name: "Heysen Deep Creek 50km", tier: 2, terrain: "Trail",
      segments: [
        {name:"Opening farmland and forest", km:12, idx:1.0, type:"mixed", note:"Rolling farmland and sandy forest tracks to open the day. The footing switches between firm and soft sand, so run the runnable parts efficiently and save the aggression for later."},
        {name:"Into Deep Creek Conservation Park", km:13, idx:1.2, type:"climb", note:"The course drops into the rugged Deep Creek Conservation Park with steep, rocky hillsides and creek gullies. This is where the real climbing and the technical footing begin, so shorten your stride and keep your feet quiet."},
        {name:"Coastal cliffs and gullies", km:13, idx:1.25, type:"technical", note:"Steep coastal descents to the creek mouths and grinding climbs straight back out, on rocky, uneven ground above the sea. Beautiful and relentless: hike the ups with intent and stay controlled on the sharp descents."},
        {name:"Rolling run to the finish", km:12, idx:1.05, type:"mixed", note:"Undulating farmland and forest trail back to the finish. The steep coastal work is behind you, so this is where honest early pacing pays off in a strong close rather than a survival shuffle."}
      ],
      cue: {
        start: "This is a rugged coastal and conservation-park ultra with rolling farmland at each end and the steep, rocky Deep Creek gullies in the middle. The scenery hides how much sharp climbing and technical descending sits in the belly of the course.",
        mistakes: "Reading the runnable farmland opening as an easy day and arriving at the Deep Creek climbs already tired. The park section is where the race is won or lost, so pace the first third for it."
      }},
    "marysville50": { name: "Marysville Marathon 50km", tier: 2, terrain: "Trail",
      segments: [
        {name:"Rolling opening loops", km:12, idx:1.0, type:"mixed", note:"Non-technical fire trail and singletrack through the regenerating Yarra Ranges forest, built from loops and out-and-backs. It flows well, so resist letting smooth ground turn into a fast start."},
        {name:"The sharp climb", km:6, idx:1.3, type:"climb", note:"A sharp uphill section around the 13km mark that reshuffles the field every year. This is a hike-with-purpose climb, not a place to prove anything; effort here should feel conservative."},
        {name:"Walking-only hills", km:14, idx:1.2, type:"climb", note:"The middle of the course rolls up and over several steep, walking-only hills, including a long descent to a turnaround that you then climb straight back up. Manage the descents so your quads survive for the return."},
        {name:"Waterfall and rolling middle", km:9, idx:1.05, type:"mixed", note:"A quick run past a waterfall and more undulating forest trail. Some rocky and slippery patches ask for attention, but this is where a steady runner starts reeling people in."},
        {name:"Flat, gentle run home", km:9, idx:0.95, type:"runnable", note:"The final stretch turns mostly flat with a gentle downward slope to the finish. If you paced the walking hills honestly, this is fast, free ground to close on."}
      ],
      cue: {
        start: "Marysville stacks its steep, walking-only hills through the middle and hands you a flat, gently downhill finish. With over 1700m of climbing on non-technical trail, the reward goes to whoever hikes the middle climbs with discipline.",
        mistakes: "Attacking the sharp 13km climb and the walking-only hills instead of hiking them, then having nothing for the fast, flat run home where time is actually there to be made."
      }},
    "noosaoutnback50": { name: "Noosa Out'N'Back 50km", tier: 2, terrain: "Trail",
      segments: [
        {name:"Out through Ringtail State Forest", km:15, idx:0.95, type:"runnable", note:"Smooth, shaded forest and dirt road heading north-west via Ringtail State Forest. This is highly runnable ground, so lock into an efficient, repeatable rhythm and get your fuelling humming early."},
        {name:"To Twin Hill Views turnaround", km:10, idx:1.05, type:"mixed", note:"Gently rolling trail and 4WD track out to the Twin Hill Views Lookout turnaround, with a few creek crossings. Nothing steep, but this is the halfway checkpoint (cutoff around 23km), so arrive comfortable, not cooked."},
        {name:"Return via Yurol State Forest", km:15, idx:1.0, type:"runnable", note:"Back south-east through Yurol State Forest on runnable forest trail. The lack of big climbs means fatigue creeps in as pace slippage, so hold form and keep the gels coming."},
        {name:"Lake McDonald to the finish", km:10, idx:0.95, type:"runnable", note:"Flat, fast running past Lake McDonald back to the Noosa District Sports Complex. On a course this runnable, an honest first half means you can genuinely push this final stretch."}
      ],
      cue: {
        start: "Out'N'Back is a highly runnable 50km with only around 880m of climbing, out to Twin Hill Views and back through shaded state forest. There is nowhere to hide from pace here, so even effort and steady fuelling are the whole strategy.",
        mistakes: "Treating a runnable course as a licence to start fast, then bleeding minutes in the second half when there are no climbs to force a walk and reset. Discipline, not bravery, wins flat ultras."
      }},
    "maroondahdam50": { name: "Maroondah Dam 50km", tier: 2, terrain: "Trail",
      segments: [
        {name:"Reservoir park opening", km:10, idx:1.05, type:"mixed", note:"Walking tracks around the Maroondah Reservoir and into the Yarra Ranges, undulating from the gun. The autumn forest is gorgeous and distracting, so keep an eye on effort and ease into the day."},
        {name:"First big climb", km:12, idx:1.3, type:"climb", note:"A sustained climb up into the ranges early in the race. With around 1650m of gain packed into the course, this is a power-hike section; going anaerobic here mortgages the whole back half."},
        {name:"Rolling ridge and descents", km:14, idx:1.15, type:"technical", note:"The heart of the course rolls over forested ridgelines with steep pinches and technical, sometimes damp descents. Protect your quads on the downs and keep your feet light on the roots and rock."},
        {name:"Second climb", km:8, idx:1.25, type:"climb", note:"Another significant climb deep in the race when the legs are already loaded. Break it into short blocks, keep fuelling, and trust that steady hiking is faster here than surging and blowing."},
        {name:"Descent to the dam finish", km:6, idx:0.9, type:"descent", note:"A long drop back down toward the reservoir to finish. Stay controlled and let gravity help rather than hammering tired quads into the line."}
      ],
      cue: {
        start: "Maroondah Dam packs roughly 1650m of climbing into 50km of Yarra Ranges walking track, with two big climbs and technical, often damp descents between them. It is a proper hill runner's course that punishes an eager start.",
        mistakes: "Running the first climb hard because the legs feel good, then having nothing for the second climb and shredded quads on the technical descents. Save the aggression for the second half."
      }},
    "mtlyellskyrun50": { name: "DIVERGE Mt Lyell Skyrun 52km", tier: 3, terrain: "Mountain",
      segments: [
        {name:"Direct ascent of Mt Owen", km:8, idx:1.4, type:"climb", note:"The race goes straight up Mt Owen by the most direct line, a steep, relentless, hands-on-knees ascent from the start. This is pure power-hiking; there is no shame and much wisdom in walking every step efficiently."},
        {name:"Ridgelines and MTB trails", km:12, idx:1.2, type:"technical", note:"Steep, epic ridgeline traversing linked by mountain bike trails, exposed and technical underfoot. Move with your eyes up the trail, respect the drop-offs, and keep effort even across the rolling high ground."},
        {name:"Ascent and traverse of Mt Lyell", km:10, idx:1.35, type:"climb", note:"The climb onto Mt Lyell and along its summit ridge, the roof of the race, on steep and rocky ground. Fuel before you get here and keep the climbing rhythm patient; the summit is only the halfway story."},
        {name:"Super steep, super direct descents", km:7, idx:1.15, type:"technical", note:"The descents off the tops are described as super steep and super direct, dropping through Horsetail Falls and the copper-mining landscape past Iron Blow Lookout. Brake with control, save your quads, and stay switched on where it is loose."},
        {name:"Railway formation run-in", km:15, idx:0.95, type:"runnable", note:"An 11km restored railway formation with a gentle grade and valley views, through an old mining ghost town to the finish. After all the mountain work this is where a runner who paced the peaks well can finally flow."}
      ],
      cue: {
        start: "The Mt Lyell Skyrun is a genuine mountain skyrace: around 2771m of climbing over 52km, straight up Mt Owen, across ridgelines and over Mt Lyell before a runnable railway-grade finish. Time targets mean little here; move well on the steeps and stay safe on the descents.",
        mistakes: "Pacing it like a runnable ultra and blowing up on the direct Mt Owen ascent, or trashing the quads on the super-steep descents so there is nothing left for the long railway run-in. Respect the mountain first, chase pace last."
      }},
    "diverse25": { name: "DIVERGE Skyruns 25km Run/Hike", tier: 2, terrain: "Mountain",
      segments: [
        {name:"Climb out of Queenstown", km:7, idx:1.35, type:"climb", note:"The course climbs hard out of the valley into the moonscape hills above Queenstown from early on. Treat it as a hike-strong section and keep the effort honest; the views are worth the patience."},
        {name:"Ridge and moonscape traverse", km:8, idx:1.2, type:"technical", note:"Rolling, exposed high ground across the bare copper-stained hills with plenty of short, sharp pinches. Run what runs, hike what climbs, and keep your footing light on the loose, rocky ground."},
        {name:"Rainforest and waterfalls", km:5, idx:1.15, type:"technical", note:"The course dips into rainforest past soaring waterfalls, where the trail turns greener, steeper and often damp underfoot. Enjoy it, but stay controlled on the slick descents."},
        {name:"Descent to the finish", km:5, idx:0.95, type:"descent", note:"A final drop back down toward Queenstown to close. Let the gradient do the work and finish smooth rather than hammering tired legs into the line."}
      ],
      cue: {
        start: "The 25km run/hike is a short but genuinely hilly mountain course through Queenstown's moonscape hills, rainforest and waterfalls. It is billed as a run/hike for a reason: strong, patient hiking on the climbs is the right way to race it.",
        mistakes: "Racing the early climb out of the valley like a flat 25km, then having nothing for the rolling ridge and the slick rainforest descents. On a hilly short course, effort control still matters."
      }}

  };

  var TYPE_LABEL = { climb: "Climb", descent: "Descent", technical: "Technical", runnable: "Runnable", mixed: "Mixed terrain" };

  // From the TRAIL RACE COACHING TEMPLATE (Women): short effort cue per segment,
  // as rendered on the Race Card tab. First and last segments get position-specific cues.
  function effortCue(type, isFirst, isLast) {
    if (isFirst) return "Hold back, feels too easy on purpose";
    if (isLast) {
      if (type === "descent") return "Let it run, controlled fast finish";
      if (type === "climb") return "Everything you have left, one step at a time";
      return "Lift gently, make up places now";
    }
    switch (type) {
      case "climb": return "Short stride, climb by effort not pace";
      case "descent": return "Protect the quads, controlled speed";
      case "technical": return "Feet first, pace second";
      case "runnable": return "Settle into rhythm, fuel now";
      default: return "Steady, don't chase the pace";
    }
  }

  // From the template's Coaching Playbook tab, section 4: common pacing mistake
  // by terrain, and the fix.
  var MISTAKE_FIX = {
    climb: { mistake: "Holding goal clock-pace and red-lining heart rate on the steepest grades.", fix: "Drop to the terrain-adjusted (slower) target and cap effort. Effort is the metric on climbs, not pace." },
    descent: { mistake: "Trashing the quads by over-running the descent to bank time.", fix: "Protect your quads so the free downhill later isn't wasted. Controlled speed, not maximum speed." },
    technical: { mistake: "Forcing pace on ground that punishes speed, risking a fall that costs far more than caution.", fix: "Foot placement over pace. Slow is smooth, smooth is fast on technical ground." },
    runnable: { mistake: "Treating easy terrain as rest, or over-spending because it feels effortless.", fix: "Hold the target pace, no faster. 'Effortless' early is over-spending you pay for later. Fuel here." },
    mixed: { mistake: "Drifting or coasting mentally, losing seconds without noticing.", fix: "Stay mentally engaged. Check your target split at each checkpoint to avoid silent drift." }
  };

  // Leverage tips: how to run each segment type given the runner's stated strength.
  // Keyed by [segment.type][strength]. Segments of type "mixed" get no leverage tip,
  // since mixed terrain doesn't clearly reward or punish any one strength.
  var LEVERAGE = {
    climb: {
      climb: "This is your edge. Push a slightly harder effort here than the field around you and let the climb do the separating.",
      descent: "Not your strength. Keep this controlled and metronomic rather than trying to match the climbers near you; you'll take time back on the next descent.",
      technical: "Grind at a sustainable hike rather than trying to run what you can't run efficiently. Save your legs for the technical terrain ahead.",
      runnable: "Hike early and often here. Chasing a running pace uphill will cost you more than it saves."
    },
    descent: {
      climb: "Let the pace come to you rather than forcing turnover. A controlled descent still recovers your legs for the next climb.",
      descent: "This is where you can bank real time. Open your stride and commit, provided the surface allows it.",
      technical: "Focus on foot placement over speed through any rocky or rooted ground. A fall costs far more time than a cautious descent.",
      runnable: "Use momentum rather than muscling the pace. Let gravity do the work and save your legs."
    },
    technical: {
      climb: "Slow your rhythm and pick clean lines rather than trying to power through. Save the pushing for the next climb.",
      descent: "Resist the urge to fly. Technical ground punishes speed more than any climb will.",
      technical: "This is where you can move away from the field. Stay confident and keep your feet moving without overthinking each step.",
      runnable: "Shorten your stride and slow down. Technical terrain is not the place to try to hold pace."
    },
    runnable: {
      climb: "Use this section to recover rhythm before the next climb. Don't force pace you don't need yet.",
      descent: "Settle into an efficient, relaxed cruising pace and save the effort for the next descent.",
      technical: "This is your section to make up time. Relax and let your natural running economy do the work.",
      runnable: "This is your section. Hold a smooth, efficient pace and use it to build a buffer."
    }
  };

  


/* Her Trails Pace Predictor v2. Data is read from the Airtable-fed JSON, with the snapshot above as fallback. */
(function () {
  var FEED = 'https://gashsamantha-coder.github.io/her-trails-programs-feed/pace-predictor.json';
  var FUEL_PAGE = '/fuelling-planner';
  var root = document.getElementById('htpp');
  if (!root) return;

  // Verified female finisher reference points (Airtable: Female Results). Reference only, not a prediction.
  var BENCH = {
    'surf-coast-century-100km': { fast: 9 * 60 + 3, fastL: 'the first woman in 2024 (9:03:00)', slow: 12 * 60 + 37.68, slowL: 'the 20th woman in 2024 (12:37:41)' },
    'tarawera-50km': { fast: 7 * 60 + 28.98, fastL: 'the median woman in 2025 (7:28:59)', slow: 13 * 60 + 0.85, slowL: 'the last woman home in 2025 (13:00:51, against a 14 hour limit)' },
    'buffalo-stampede-100km': { fast: 13 * 60 + 11.7, fastL: 'the first woman in 2024 (13:11:42)', slow: 19 * 60 + 45.43, slowL: 'the 20th woman in 2024 (19:45:26)' }
  };

  function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  // Round once to whole seconds, then split, so seconds never show as 60.
  function hms(min) { var s = Math.round(min * 60), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h + ':' + pad(m) + ':' + pad(s % 60); }
  function mmss(min) { var s = Math.round(min * 60), m = Math.floor(s / 60); return m + ':' + pad(s % 60); }

  // Build the working event list from the snapshot, then overlay live data if it loads.
  var NOTES = {}, CUE_BY_NAME = {};
  Object.keys(EVENTS).forEach(function (k) {
    var e = EVENTS[k]; CUE_BY_NAME[e.name] = e.cue || {};
    e.segments.forEach(function (s) { if (s.note) NOTES[s.name] = s.note; });
  });
  var list = Object.keys(EVENTS).map(function (k) {
    var e = EVENTS[k];
    return { id: slug(e.name), name: e.name, terrain: e.terrain, segments: e.segments, cue: e.cue || {}, fade: e.fade || null, live: false };
  });
  function fromFeed(d) {
    if (!d || !d.events || !d.events.length) return null;
    var out = d.events.map(function (e) {
      var tcue = (d.cues && d.cues[String(e.terrain || '').toLowerCase()]) || {};
      var snap = CUE_BY_NAME[e.name] || {};
      var old = null; for (var i = 0; i < list.length; i++) if (list[i].name === e.name) old = list[i];
      return {
        id: e.id || slug(e.name), name: e.name, terrain: e.terrain,
        segments: e.segments.map(function (s) { return { name: s.name, km: s.km, idx: s.idx, type: s.type, note: s.note || NOTES[s.name] || '' }; }),
        cue: { start: snap.start || tcue.start || '', mistakes: snap.mistakes || tcue.mistakes || '' },
        fade: old ? old.fade : null, live: true
      };
    });
    return out.length ? out : null;
  }

  var TYPE_LABEL = { climb: 'Climb', descent: 'Descent', technical: 'Technical', runnable: 'Runnable', mixed: 'Mixed terrain' };
  function effort(type, first, last) {
    if (first) return 'Hold back, it should feel too easy on purpose';
    if (last) return type === 'descent' ? 'Let it run, controlled and fast' : type === 'climb' ? 'Everything you have left, one step at a time' : 'Lift gently and use what is left';
    return { climb: 'Short stride, climb by effort not pace', descent: 'Protect your quads, controlled speed', technical: 'Feet first, pace second', runnable: 'Settle into rhythm and fuel now' }[type] || 'Steady, do not chase the pace';
  }

  function plan(ev, goalMin, stopMin, slow) {
    var segs = ev.segments, wt = 0, km = 0, i;
    for (i = 0; i < segs.length; i++) { wt += segs[i].km * segs[i].idx; km += segs[i].km; }
    var moving = goalMin - stopMin, base = moving / wt, cum = 0, cumKm = 0, rows = [];
    var lateFrom = km * 2 / 3, run = 0, lateExtra = 0;
    for (i = 0; i < segs.length; i++) {
      var s = segs[i], t = s.km * s.idx * base; cum += t; cumKm += s.km;
      var segStart = run; run += s.km;
      var lateKm = Math.max(0, run - Math.max(segStart, lateFrom));
      lateExtra += t * (lateKm / s.km) * slow;
      rows.push({ seg: s, time: t, pace: t / s.km, cum: cum + stopMin * cumKm / km, cumKm: cumKm, first: i === 0, last: i === segs.length - 1 });
    }
    return { rows: rows, km: km, moving: moving, avgPace: moving / km, lateExtra: lateExtra };
  }

  var state = { ev: null, h: '', m: '', stop: 0, slow: 0 };
  function q(id) { return root.querySelector('#' + id); }

  root.innerHTML =
    '<div class="pp-card"><div class="pp-grid">' +
    '<label class="pp-f"><span>Race</span><select id="pp-ev"></select></label>' +
    '<div class="pp-f"><span>Goal finish time</span><div class="pp-time"><input id="pp-h" inputmode="numeric" maxlength="2" placeholder="hh" aria-label="Hours"><b>:</b><input id="pp-m" inputmode="numeric" maxlength="2" placeholder="mm" aria-label="Minutes"></div></div>' +
    '<label class="pp-f"><span>Total stopped time (minutes)</span><input id="pp-stop" inputmode="numeric" maxlength="3" placeholder="0"></label>' +
    '<label class="pp-f"><span>If you slow late, by</span><select id="pp-slow"><option value="0">No slowdown</option><option value="5">5% in the final third</option><option value="10">10% in the final third</option><option value="15">15% in the final third</option></select></label>' +
    '</div><p class="pp-hint">Stopped time covers aid stations and any longer breaks. The plan spreads your remaining moving time across the course by terrain difficulty.</p><div id="pp-err" class="pp-err" role="alert"></div></div>' +
    '<div id="pp-out"></div>';

  function fillSelect() {
    var s = q('pp-ev'); s.innerHTML = '<option value="">Choose your race</option>';
    list.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (e) {
      var o = document.createElement('option'); o.value = e.id; o.textContent = e.name; s.appendChild(o);
    });
    if (state.ev) s.value = state.ev.id;
  }

  function num(v) { return /^\d+$/.test(String(v).trim()) ? parseInt(v, 10) : NaN; }

  function render() {
    var out = q('pp-out'), err = q('pp-err'); err.textContent = ''; out.innerHTML = '';
    if (!state.ev) return;
    var h = num(state.h), m = num(state.m), stop = state.stop === '' ? 0 : num(state.stop);
    if (state.h === '' && state.m === '') return;
    if (isNaN(h) || isNaN(m) || m > 59 || h > 99) { err.textContent = 'Enter your goal as hours and minutes, with minutes from 0 to 59.'; return; }
    if (isNaN(stop)) { err.textContent = 'Enter stopped time as whole minutes, or leave it blank.'; return; }
    var goal = h * 60 + m;
    if (goal < 20) { err.textContent = 'That goal time is too short to plan. Enter at least 20 minutes.'; return; }
    if (stop >= goal) { err.textContent = 'Stopped time needs to be shorter than your goal time.'; return; }
    var P = plan(state.ev, goal, stop, state.slow / 100);
    var flag = '';
    if (P.avgPace < 3) flag = 'This goal needs an average moving pace faster than 3:00 per km, which is beyond what this course is likely to allow. Try a longer time.';
    var html = '';
    if (flag) html += '<div class="pp-note">' + esc(flag) + '</div>';
    html += '<div class="pp-stats"><div><b>' + hms(goal) + '</b><span>Goal finish</span></div><div><b>' + mmss(P.avgPace) + ' per km</b><span>Average moving pace</span></div><div><b>' + (Math.round(P.km * 10) / 10) + ' km</b><span>Course distance</span></div>' + (stop ? '<div><b>' + hms(stop) + '</b><span>Stopped time</span></div>' : '') + '</div>';
    var B = BENCH[state.ev.id];
    if (B) {
      var msg = goal < B.fast ? 'Your goal is faster than ' + B.fastL + '.' : goal > B.slow ? 'Your goal is slower than ' + B.slowL + '.' : 'Your goal sits between ' + B.fastL + ' and ' + B.slowL + '.';
      html += '<div class="pp-bench"><b>Reality check</b><p>' + esc(msg) + '</p><p class="pp-small">These are verified women\'s results, shown for context. They are not a prediction of your time.</p></div>';
    }
    if (state.slow) {
      var late = P.lateExtra;
      html += '<div class="pp-bench"><b>If you slow late</b><p>A ' + state.slow + '% slowdown across the final third of the course would move your finish to ' + hms(goal + late) + ', which is ' + Math.round(late) + ' minutes later. The most useful fix is a steadier first half, not a harder second half.</p></div>';
    }
    html += '<div class="pp-tablewrap"><table class="pp-table"><thead><tr><th>Section</th><th>Terrain</th><th>Km</th><th>Pace per km</th><th>Section time</th><th>Clock time (with stops)</th></tr></thead><tbody>';
    P.rows.forEach(function (r) {
      html += '<tr><td><b>' + esc(r.seg.name) + '</b><small>' + esc(effort(r.seg.type, r.first, r.last)) + '</small></td><td><span class="pp-tag pp-' + esc(r.seg.type) + '">' + esc(TYPE_LABEL[r.seg.type] || r.seg.type) + '</span></td><td>' + (Math.round(r.seg.km * 10) / 10) + '</td><td>' + mmss(r.pace) + '</td><td>' + hms(r.time) + '</td><td>' + hms(r.cum) + '</td></tr>';
      if (r.seg.note) html += '<tr class="pp-noterow"><td colspan="6">' + esc(r.seg.note) + '</td></tr>';
    });
    html += '</tbody></table></div>';
    if (state.ev.cue && (state.ev.cue.start || state.ev.cue.mistakes)) {
      html += '<div class="pp-cues">' + (state.ev.cue.start ? '<div><b>How to start</b><p>' + esc(state.ev.cue.start) + '</p></div>' : '') + (state.ev.cue.mistakes ? '<div><b>Common mistakes on this course</b><p>' + esc(state.ev.cue.mistakes) + '</p></div>' : '') + '</div>';
    }
    var qs = '?event=' + encodeURIComponent(state.ev.id) + '&h=' + h + '&m=' + m + (stop ? '&stop=' + stop : '');
    html += '<div class="pp-actions"><a class="pp-btn" href="' + FUEL_PAGE + qs + '">Plan your fuelling for this race</a><button class="pp-btn pp-ghost" id="pp-share" type="button">Copy a link to this plan</button><button class="pp-btn pp-ghost" id="pp-print" type="button">Print this plan</button></div>';
    html += '<p class="pp-small">This is a pacing guide. It divides your goal time across the course by terrain difficulty and is not a prediction of the time you will run.</p>';
    out.innerHTML = html;
    q('pp-print').onclick = function () { window.print(); };
    q('pp-share').onclick = function () {
      var url = location.origin + location.pathname + qs, b = q('pp-share');
      function done() { b.textContent = 'Link copied'; }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { window.prompt('Copy this link', url); });
      else window.prompt('Copy this link', url);
    };
    try { history.replaceState(null, '', qs); } catch (e) { /* ignore */ }
  }

  function bind() {
    q('pp-ev').onchange = function () { state.ev = list.filter(function (e) { return e.id === this.value; }.bind(this))[0] || null; render(); };
    q('pp-h').oninput = function () { state.h = this.value; render(); };
    q('pp-m').oninput = function () { state.m = this.value; render(); };
    q('pp-stop').oninput = function () { state.stop = this.value; render(); };
    q('pp-slow').onchange = function () { state.slow = +this.value; render(); };
  }

  fillSelect(); bind();
  var p = new URLSearchParams(location.search);
  function applyParams() {
    var id = p.get('event'); if (id) { state.ev = list.filter(function (e) { return e.id === id; })[0] || null; if (state.ev) q('pp-ev').value = id; }
    if (p.get('h')) { state.h = p.get('h'); q('pp-h').value = state.h; }
    if (p.get('m')) { state.m = p.get('m'); q('pp-m').value = state.m; }
    if (p.get('stop')) { state.stop = p.get('stop'); q('pp-stop').value = state.stop; }
    render();
  }
  applyParams();

  // Live data: replace the snapshot when the feed loads and looks sane.
  if (window.fetch) {
    var ctl = window.AbortController ? new AbortController() : null, to = setTimeout(function () { if (ctl) ctl.abort(); }, 5000);
    fetch(FEED, ctl ? { signal: ctl.signal } : {}).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      clearTimeout(to); var live = fromFeed(d);
      if (live && live.length >= 10) {
        var cur = state.ev && state.ev.id; list = live; fillSelect();
        state.ev = cur ? (list.filter(function (e) { return e.id === cur; })[0] || null) : null; render();
      }
    }).catch(function () { /* snapshot stays */ });
  }
})();
