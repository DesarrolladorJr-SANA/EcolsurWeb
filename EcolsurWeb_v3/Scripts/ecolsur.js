(function () {
    const $ = (s, e = document) => e.querySelector(s), $$ = (s, e = document) => [...e.querySelectorAll(s)];
    const B = window.ECO_IMG || '/Content/img/', RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
    // header y menú
    const hd = $('#top'), mn = $('#menu');
    addEventListener('scroll', () => hd.classList.toggle('sc', scrollY > 20), { passive: true });
    const tgl = o => { mn.classList.toggle('open', o); document.body.classList.toggle('lock', o) };
    $('#mbtn').onclick = () => tgl(!mn.classList.contains('open')); $$('#menu a').forEach(a => a.onclick = () => tgl(false));
    // coverflow
    const cd = $$('.cf figure'), N = cd.length; let c = 0, tm;
    function cf() { cd.forEach((f, i) => { let o = i - c; if (o > N / 2) o -= N; if (o < -N / 2) o += N; const a = Math.abs(o); f.style.transform = `translateX(-50%) translateX(${o * 62}%) scale(${1 - a * .13}) rotateY(${-o * 9}deg)`; f.style.zIndex = 9 - a; f.style.opacity = a > 2 ? 0 : 1 - a * .22; f.classList.toggle('on', !o) }); $('#cn').textContent = '0' + (c + 1) + ' / 0' + N }
    function go(i) { c = (i + N) % N; cf(); clearInterval(tm); if (!RM) tm = setInterval(() => go(c + 1), 5000) }
    cd.forEach((f, i) => f.onclick = () => go(i)); $('#pv').onclick = () => go(c - 1); $('#nx').onclick = () => go(c + 1); go(0);
    const cfe = $('#cf'); let x0; cfe.onmouseenter = () => clearInterval(tm); cfe.onmouseleave = () => go(c);
    cfe.addEventListener('pointerdown', e => x0 = e.clientX); cfe.addEventListener('pointerup', e => { if (x0 != null && Math.abs(e.clientX - x0) > 40) go(c + (e.clientX < x0 ? 1 : -1)); x0 = null });
    // línea de tiempo
    const tl = $('#tl'); tl.addEventListener('scroll', () => { $('#tp').style.width = (12 + 88 * tl.scrollLeft / Math.max(1, tl.scrollWidth - tl.clientWidth)) + '%' }, { passive: true });
    // servicios
    const SV = [
        ['Residuos peligrosos', 'Industriales, líquidos y sólidos', 'h3', 'Recolección, transporte, acopio y envío a disposición final con unidades especializadas, de forma segura, eficiente y conforme a la normativa vigente.', ['Recolección', 'Transporte', 'Acopio', 'Disposición final']],
        ['Manejo especial y sólidos', 'Recolección industrial', 'h4', 'Recolección especializada a la industria con cajas secas, pipas y góndolas para cada tipo de cliente y residuo.', ['Cajas secas', 'Pipas', 'Góndolas']],
        ['RPBI', 'Residuos biológico-infecciosos', 'h2', 'Recolección, transporte, acopio y disposición final de RPBI. Colocamos contenedores en hospitales y vendemos contenedores RPBI y soluciones desinfectantes.', ['Hospitales', 'Clínicas', 'Contenedores']],
        ['Aceite usado', 'Recolección con pipa', 'h5', 'Recolección y manejo responsable de aceite usado para industria, estaciones de servicio y talleres.', ['Pipas', 'Estaciones de servicio', 'Industria']],
        ['Tratamiento de aguas', 'PTAR y aguas oleosas', 'ptar', 'Tratamiento de aguas oleosas, arranque, estabilización y mantenimiento de plantas de tratamiento de aguas residuales, y limpiezas ecológicas.', ['Aguas oleosas', 'Mantenimiento PTAR', 'Trabajos especiales']],
        ['Consultoría ambiental', 'Trámites y cumplimiento', 'h1', 'Estudios y diagnósticos ambientales, licencias, COA, permisos SEMARNAT, trámites PROFEPA, planes de manejo, capacitación y auditorías.', ['COA', 'SEMARNAT', 'PROFEPA', 'Planes de manejo', 'Auditorías']],
        ['Reciclaje y acopio', 'Servicios Ambientales Urbanos', 'plant', 'Centro de acopio autorizado en Yucatán, trituración de residuos para combustibles alternos y destrucciones fiscales seguras y confidenciales. Recibimos:', ['PET', 'Aluminio', 'HDPE', 'Cartón y papel', 'Vidrio', 'Chatarra', 'Electrónicos', 'Aceite usado']]];
    const PN = $('#pns');
    SV.forEach((s, i) => { const d = document.createElement('div'); d.className = 'pn'; d.tabIndex = 0; d.setAttribute('role', 'button'); d.style.backgroundImage = `linear-gradient(transparent 25%,rgba(7,31,74,.88)),url(${B}${s[2]}.jpg)`; d.innerHTML = `<span>0${i + 1}</span><h3>${s[0]}</h3><div class="b"><small>${s[1]}</small><p>${s[3]}</p><ul>${s[4].map(x => '<li>' + x + '</li>').join('')}</ul></div>`; d.onclick = d.onfocus = () => $$('.pn', PN).forEach(p => p.classList.toggle('on', p == d)); PN.append(d) });
    PN.firstChild.classList.add('on');
    

    // COTIZADOR ECOLSUR

    const ET = {
        p: [
            'Peligroso',
            'Residuos peligrosos',
            [
                'Manifiesto de entrega, transporte y recepción',
                'Registro como generador ante SEMARNAT',
                'Plan de manejo y bitácora'
            ]
        ],
        m: [
            'Manejo especial',
            'Residuos de manejo especial',
            [
                'Plan de manejo',
                'Registro como generador estatal',
                'Manifiesto de transporte'
            ]
        ],
        a: [
            'Aceite usado',
            'Aceite usado',
            [
                'Manifiesto de entrega, transporte y recepción',
                'Registro como generador',
                'Recipientes etiquetados'
            ]
        ],
        w: [
            'Aguas oleosas',
            'Tratamiento de aguas',
            [
                'Caracterización de laboratorio',
                'Manifiesto de transporte',
                'Autorización para su disposición'
            ]
        ]
    };


    // Unidades sugeridas según el servicio
    const VEHICULOS = {
        p: ['Camión especializado', 'truck'],
        m: ['Camión de góndola', 'dump-truck'],
        a: ['Camión para tambores de aceite', 'truck-cargo-container'],
        w: ['Pipa especializada', 'tanker-truck']
    };

    const IC = {
        truck: 'truck',
        'dump-truck': 'dump-truck',
        'van-utility': 'van-utility',
        'truck-cargo-container': 'truck-cargo-container',
        'tanker-truck': 'tanker-truck'
    };

    let ty = 'p';
    let fq = 'Mensual';
    let eq = '';

    const cantidad = $('#es');
    const ek = $('#ek');
    const eb = $('#eb');

    function chips(el, items, cur, fn) {
        el.innerHTML = '';

        items.forEach(([k, label]) => {
            const b = document.createElement('button');

            b.type = 'button';
            b.className = 'ch' + (k === cur ? ' on' : '');
            b.textContent = label;

            b.onclick = () => {
                fn(k);
                chips(el, items, k, fn);
                est();
            };

            el.append(b);
        });
    }

    chips(
        $('#et'),
        Object.entries(ET).map(([k, v]) => [k, v[0]]),
        ty,
        k => ty = k
    );

    chips(
        $('#ef'),
        ['Servicio único', 'Mensual', 'Quincenal', 'Semanal', 'Diaria']
            .map(x => [x, x]),
        fq,
        k => fq = k
    );

    function est() {
        // Cada tambor equivale a 200 litros
        const tambores = Number(cantidad.value);
        const litros = tambores * 200;

        // Unidad correspondiente al tipo de servicio
        const U = VEHICULOS[ty];

        const volumen = `${tambores} tambores de 200 L (${litros.toLocaleString('es-MX')} litros)`;

        // Actualizar cantidad
        $('#ev').textContent = `${tambores} tambores`;

        // Actualizar posición del indicador
        const porcentaje = ((tambores - 1) / 49) * 100;

        ek.style.left = `${4 + porcentaje * 0.92}%`;
        eb.style.width = `${Math.max(4, porcentaje)}%`;

        // Cambiar icono del vehículo según el servicio
        const icono = IC[U[1]] || 'truck';

        if (ek.dataset.k !== `${ty}-${icono}`) {
            ek.innerHTML = `
            <i class="mdi mdi-${icono}"
               role="img"
               aria-label="${U[0]}"></i>
        `;

            ek.dataset.k = `${ty}-${icono}`;

            ek.classList.remove('pop');
            void ek.offsetWidth;
            ek.classList.add('pop');
        }

        // Actualizar recomendación
        $('#eu').textContent = U[0];

        $('#ed').textContent =
            `${ET[ty][0]} · ${fq.toLowerCase()}. ` +
            `Capacidad estimada: ${litros.toLocaleString('es-MX')} litros. ` +
            'Ruta desde nuestra planta en Umán.';

        // Actualizar documentación
        $('#el').innerHTML = ET[ty][2]
            .map(x => `<li>${x}</li>`)
            .join('');

        // Información que se enviará al formulario
        eq =
            `Tipo de servicio: ${ET[ty][1]}\n` +
            `Cantidad: ${tambores} tambores de 200 litros\n` +
            `Volumen equivalente: ${litros.toLocaleString('es-MX')} litros\n` +
            `Frecuencia: ${fq}\n` +
            `Unidad sugerida: ${U[0]}`;
    }

    // Actualizar cuando se mueve el selector
    cantidad.addEventListener('input', est);

    // Primera carga
    est();

    // Pasar información del cotizador al formulario
    const btnCotizar = $('#eg');

    if (btnCotizar) {
        btnCotizar.addEventListener('click', () => {
            const formulario = $('#f');
            const servicio = formulario?.querySelector('[name="s"]');
            const mensaje = formulario?.querySelector('[name="m"]');
            const nombre = formulario?.querySelector('[name="n"]');
            const contacto = $('#contacto');

            if (!formulario || !servicio || !mensaje) {
                console.error('No se encontró el formulario o sus campos.');
                return;
            }

            // Comprobar que el servicio exista en las opciones
            const servicioCotizado = ET[ty][1];
            const opcionExiste = [...servicio.options].some(
                opcion => opcion.value === servicioCotizado
            );

            if (!opcionExiste) {
                console.error(
                    'El servicio del cotizador no existe en el formulario:',
                    servicioCotizado
                );
                return;
            }

            // Preparar la solicitud
            servicio.value = servicioCotizado;
            mensaje.value = eq;

            // Notificar cambios
            servicio.dispatchEvent(
                new Event('change', { bubbles: true })
            );

            mensaje.dispatchEvent(
                new Event('input', { bubbles: true })
            );

            // Desplazarse al formulario
            if (contacto) {
                contacto.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Enfocar el campo de nombre después del desplazamiento
            if (nombre) {
                setTimeout(() => nombre.focus({ preventScroll: true }), 600);
            }
        });
    }




    // mapa orbital: distancia y rumbo reales desde la planta
    const P = [['Mérida', 89.62, 20.97, 'yuc', 1], ['Progreso', 89.66, 21.28, 'yuc'], ['Valladolid', 88.2, 20.69, 'yuc'], ['Campeche', 90.53, 19.85, 'cam'], ['Cd. del Carmen', 91.83, 18.65, 'cam'], ['Cancún', 86.85, 21.16, 'qr'], ['Playa del Carmen', 87.07, 20.63, 'qr'], ['Chetumal', 88.3, 18.5, 'qr']], H = P[0], K = .55;
    const pos = p => [260 + (H[1] - p[1]) * Math.cos(21 * Math.PI / 180) * 111 * K, 220 - (p[2] - H[2]) * 111 * K];
    let m = [100, 200, 300].map(r => `<circle class="ring" cx="260" cy="220" r="${r * K}"/><text x="${260 + r * K + 4}" y="216" style="opacity:.5">${r} km</text>`).join('') + '<line class="sw" x1="260" y1="220" x2="260" y2="30"/>';
    P.slice(1).forEach(p => { const [x, y] = pos(p); m += `<path class="g ${p[3]}" d="M260 220 Q${(260 + x) / 2 + 8} ${(220 + y) / 2 - 18} ${x} ${y}"/>` });
    P.forEach(p => { const [x, y] = pos(p); m += `<g class="g ${p[3]}">${p[4] ? '<circle class="pu" cx="260" cy="220" r="9"/>' : ''}<circle class="d" cx="${x}" cy="${y}" r="${p[4] ? 9 : 5}"/><text class="${p[4] ? 'h' : ''}" x="${x + 12}" y="${y + 4}">${p[0]}${p[4] ? ' · Planta' : ''}</text></g>` });
    $('#mp').innerHTML = m;
    $$('#rg button').forEach(b => b.onclick = () => { $$('#rg button').forEach(x => x.classList.toggle('on', x == b)); $$('#mp .g').forEach(g => g.classList.toggle('dim', b.dataset.r != 'all' && !g.classList.contains(b.dataset.r) && !g.querySelector('.h'))) });
    // ciclo
    const R = [['Recolección', 'Retiramos tus residuos en tus instalaciones con unidades autorizadas, cumpliendo la normativa ambiental.'], ['Transporte', 'Flota especializada y autorizada para residuos peligrosos y no peligrosos, con rutas optimizadas.'], ['Tratamiento', 'Procesos físicos, químicos y biológicos para reducir riesgos e impacto ambiental.'], ['Disposición final', 'Disposición directa en nuestras instalaciones autorizadas, con manifiestos y trazabilidad.']], ST = $('#sts'), PH = $$('#ph img'); let r = 0, rt;
    R.forEach((s, i) => { const b = document.createElement('button'); b.className = 'st'; b.innerHTML = `<b><em>0${i + 1}</em>${s[0]}</b><p>${s[1]}</p>`; b.onclick = () => { ring(i); clearInterval(rt) }; ST.append(b) });
    function ring(i) { r = i; $$('.st', ST).forEach((b, k) => b.classList.toggle('on', k == i)); PH.forEach((p, k) => p.classList.toggle('on', k == i)) } ring(0); if (!RM) rt = setInterval(() => ring((r + 1) % 4), 4000);

    // camión que se carga

    const CG = [
        ['Aceite usado', 'barrel', '#2677cf'],
        ['Residuos peligrosos', 'biohazard', '#071F4A'],
        ['Aguas oleosas', 'water', '#0B3A85'],
        ['Manejo especial', 'package-variant-closed', '#1c5fb8'],
        ['Electrónicos', 'chip', '#0f4aa0'],
        ['Chatarra', 'cog', '#3C98E4']
    ];
    const cg = $('#cargo'), sg = $('.cg-s', cg), tk = $('#ctk'), sk = $('#stk'), cl = $('#cgl'); let rid = 0;
    CG.forEach(i => { const li = document.createElement('li'); li.innerHTML = `<i class="mdi mdi-${i[1]}"></i>${i[0]}<i class="mdi mdi-check-circle ck"></i>`; cl.append(li) });
    const wt = ms => new Promise(r => setTimeout(r, ms));
    function reset() { sk.innerHTML = ''; $$('li', cl).forEach(l => l.classList.remove('on')); tk.style.transition = 'none'; tk.className = 'truck'; void tk.offsetWidth; tk.style.transition = '' }
    function layer(i) {
        const d = document.createElement('div'), c = CG[i];
        d.className = 'ly'; d.setAttribute('aria-label', c[0]);
        const m = c[3] ? `<img src="${B}carga/${c[3]}" alt="">` : `<i class="mdi mdi-${c[1]}"></i>`;
        d.innerHTML = `<b style="${c[3] ? '' : `background:linear-gradient(135deg,${c[2]},${c[2]}cc)`}">${m}</b><span class="tg">${c[0]}</span>`;
        return d;
    }    async function play(id) {
        while (id == rid) {
            reset(); sg.classList.add('drv'); tk.classList.add('in'); await wt(1200); if (id != rid) return; sg.classList.remove('drv');
            for (let i = 0; i < CG.length; i++) {
                sk.append(layer(i)); $$('li', cl)[i].classList.add('on');
                await wt(560); tk.classList.add('hit'); await wt(300); tk.classList.remove('hit'); await wt(450); if (id != rid) return;
            }
            await wt(1600); if (id != rid) return;
            sg.classList.add('drv'); tk.classList.replace('in', 'go'); await wt(1500);
        }
    }
    function start() {
        const id = ++rid;
        if (RM) { reset(); CG.forEach((_, i) => { const l = layer(i); l.style.animation = 'none'; sk.append(l) }); tk.style.transition = 'none'; tk.classList.add('in'); $$('li', cl).forEach(l => l.classList.add('on')); return }
        play(id);
    }
    new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting && !cg.dataset.run) { cg.dataset.run = 1; start() }
        else if (!e.isIntersecting && cg.dataset.run) { delete cg.dataset.run; rid++ }
    }), { threshold: .35 }).observe(cg);
    $('#cgr').onclick = () => { cg.dataset.run = 1; start() };


    // contadores y revelado
    const co = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return; co.unobserve(e.target); const el = e.target, n = +el.dataset.n, s = el.dataset.s || '', p = el.dataset.p || (s ? '' : '+'), t0 = performance.now();
        (function f(t) { const k = Math.min(1, (t - t0) / 1400), v = Math.round(n * (1 - Math.pow(1 - k, 3))); el.textContent = p + v.toLocaleString('es-MX') + s; if (k < 1) requestAnimationFrame(f) })(t0)
    }), { threshold: .6 }); $$('[data-n]').forEach(e => co.observe(e));
    const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target) } }), { threshold: .12 }); $$('.rv').forEach((e, i) => { e.style.transitionDelay = (i % 3) * 80 + 'ms'; rv.observe(e) });
    // formulario
    $('#f').onsubmit = e => { e.preventDefault(); const d = new FormData(e.target); location.href = `mailto:contacto@ecolsur.com.mx?subject=${encodeURIComponent('Solicitud: ' + d.get('s'))}&body=${encodeURIComponent(`Nombre: ${d.get('n')}\nEmpresa: ${d.get('e')}\nServicio: ${d.get('s')}\n\n${d.get('m')}`)}`; $('#ok').style.display = 'block' };
})();
