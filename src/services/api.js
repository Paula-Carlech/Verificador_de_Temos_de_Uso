export const analyzeContract = async (text, file) => {
    const formData = new FormData();

    if (text) formData.append("text", text);
    if (file) formData.append("file", file);

    const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Erro ao comunicar com o servidor");
    }

    return await response.json();
};
