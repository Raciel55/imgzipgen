    const inputImagenes = document.getElementById("imagenes");

    const preview = document.getElementById("preview");

    let archivos = [];

    /* VISTA PREVIA */

    inputImagenes.addEventListener("change", () => {

        preview.innerHTML = "";

        archivos = [...inputImagenes.files];

        archivos.forEach(archivo => {

            const reader = new FileReader();

            reader.onload = (e) => {

                const img = document.createElement("img");

                img.src = e.target.result;

                preview.appendChild(img);

            };

            reader.readAsDataURL(archivo);

        });

    });

    /* CREAR ZIP */

    document
.getElementById("crearZip")
.addEventListener("click", async () => {

    if(archivos.length === 0){

        alert("Sube imágenes primero");

        return;

    }

    const nombreZip =
        document.getElementById("nombreZip").value.trim();

    if(nombreZip === ""){

        alert("Ingresa un nombre para el ZIP");

        return;

    }

    const copias =
        parseInt(document.getElementById("copias").value);

    const zip = new JSZip();

    for(const archivo of archivos){

        const extension =
            archivo.name.split(".").pop();

        const nombre =
            archivo.name.replace(`.${extension}`, "");

        const contenido =
            await archivo.arrayBuffer();

        for(let i = 1; i <= copias; i++){

            zip.file(
                `${nombre}_copia${i}.${extension}`,
                contenido
            );

        }

    }

    /* GENERAR ZIP */

    zip.generateAsync({type:"blob"})
    .then((contenidoZip) => {

        saveAs(
            contenidoZip,
            `${nombreZip}.zip`
        );

    });

});