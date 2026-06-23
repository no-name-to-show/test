const form = document.getElementById("downloadForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = document.getElementById("fileUrl").value;
  const filename = document.getElementById("fileName").value;

  status.textContent = "Descargando...";

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("No se pudo obtener el archivo");

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(blobUrl);

    status.textContent = "Descarga completada ✔️";
  } catch (err) {
    status.textContent = "Error al descargar ❌";
    console.error(err);
  }
});