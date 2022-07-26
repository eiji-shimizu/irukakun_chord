// play関数の中で利用されるシンセサイザー
const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();

/* 初期化処理 */
function initialize() {

    // イベント設定
    document.getElementById('major_scale_select').addEventListener('change', (e) => {
        setScale(e, 'selected_major_scale', false);
    });
    document.getElementById('minor_scale_select').addEventListener('change', (e) => {
        setScale(e, 'selected_minor_scale', true);
    });

    window.addEventListener("load", () => {
        chordNames.forEach(name => {
            const buttons = document.getElementsByName(name);
            buttons.forEach(button => {
                button.onclick = async () => {
                    await Tone.start();
                    play(chordMap[name]);
                };
            });
        });
    });

    // 調の初期値
    document.getElementById('major_scale_select').value = 'C';
    document.getElementById('major_scale_select').dispatchEvent(new Event('change'));
    document.getElementById('minor_scale_select').value = 'Am';
    document.getElementById('minor_scale_select').dispatchEvent(new Event('change'));

}

function play(noteNames) {
    polySynth.triggerAttackRelease(noteNames, "8n");
}

function setScale(event, id, isMinor) {
    // 子要素を全て削除
    while (document.getElementById(id).firstChild) {
        document.getElementById(id).removeChild(document.getElementById(id).firstChild)
    }
    // 調の名称を追加
    let h = document.createElement('div');
    h.classList.add('cell');
    h.textContent = event.target.options[event.target.selectedIndex].textContent;
    document.getElementById(id).appendChild(h);
    // コードボタンを追加
    let no = 1;
    scaleMap[event.target.value].forEach(e => {
        let d = document.createElement('div');
        d.classList.add('cell');
        let prot = document.getElementsByName(e)[0];
        let b = prot.cloneNode(true);
        b.classList.remove('chordBoxButton');
        b.classList.add('chordButton');
        b.id = 'chord' + String(no);
        if (isMinor) {
            b.id = 'm' + b.id;
        }
        no++;
        b.onclick = async () => {
            await Tone.start();
            play(chordMap[b.name]);
        };
        d.appendChild(b);
        document.getElementById(id).appendChild(d);
    });
}

initialize();