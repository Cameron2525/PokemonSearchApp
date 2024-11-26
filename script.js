 const searchInput = document.getElementById("search-input");
        const searchButton = document.getElementById("search-button");

        searchButton.addEventListener("click", async () => {
            const query = searchInput.value.trim().toLowerCase();
            const baseURL = "https://pokeapi.co/api/v2/pokemon/";

            // Clear previous data
            clearUI();

            if (!query) {
                alert("Please enter a Pokémon name or ID.");
                return;
            }

            try {
                const response = await fetch(`${baseURL}${query}`);
                if (!response.ok) throw new Error("Pokémon not found");

                const data = await response.json();
                updateUI(data);
            } catch (error) {
                alert("Pokémon not found");
            }
        });

        function clearUI() {
            document.getElementById("pokemon-name").textContent = "";
            document.getElementById("pokemon-id").textContent = "";
            document.getElementById("weight").textContent = "";
            document.getElementById("height").textContent = "";
            document.getElementById("hp").textContent = "";
            document.getElementById("attack").textContent = "";
            document.getElementById("defense").textContent = "";
            document.getElementById("special-attack").textContent = "";
            document.getElementById("special-defense").textContent = "";
            document.getElementById("speed").textContent = "";
            document.getElementById("types").innerHTML = "";
            document.getElementById("sprite-container").innerHTML = "";
        }

        function updateUI(data) {
            // Populate Pokémon details
            document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
            document.getElementById("pokemon-id").textContent = `#${data.id}`;
            document.getElementById("weight").textContent = `Weight: ${data.weight}`;
            document.getElementById("height").textContent = `Height: ${data.height}`;
            document.getElementById("hp").textContent = data.stats[0].base_stat;
            document.getElementById("attack").textContent = data.stats[1].base_stat;
            document.getElementById("defense").textContent = data.stats[2].base_stat;
            document.getElementById("special-attack").textContent = data.stats[3].base_stat;
            document.getElementById("special-defense").textContent = data.stats[4].base_stat;
            document.getElementById("speed").textContent = data.stats[5].base_stat;

            // Update types
            const typesElement = document.getElementById("types");
            data.types.forEach(typeInfo => {
                const type = document.createElement("div");
                type.textContent = typeInfo.type.name.toUpperCase();
                typesElement.appendChild(type);
            });

            // Update sprite
            const spriteContainer = document.getElementById("sprite-container");
            const img = document.createElement("img");
            img.id = "sprite";
            img.src = data.sprites.front_default;
            spriteContainer.appendChild(img);
        }
