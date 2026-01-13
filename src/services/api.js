export const analyzeContract = async (text) => {
    const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
    });

    if (!response.ok) {
        throw new Error("Erro ao comunicar com o servidor");
    }

    return await response.json();
};
