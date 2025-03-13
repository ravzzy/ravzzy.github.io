// Fetch sidebar HTML dynamically and insert it into the page
fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;
        console.log ('sidebar.html loaded?:\n\n', data);

        // After sidebar is loaded, add event listeners to the buttons
        const menuBtn = document.querySelector(".menu-btn");
        const closeBtn = document.querySelector(".sidebar-close-btn");
        const sidebar = document.querySelector(".sidebar");

        function openSidebar() {
            sidebar.classList.add("open");

            setTimeout(() => {
                sidebar.classList.add("show-menu");
            }, 400);
        }

        function closeSidebar() {
            sidebar.classList.remove("show-menu");

            setTimeout(() => {
                sidebar.classList.remove("open");
            }, 500);
        }

        menuBtn.addEventListener("click", openSidebar);
        closeBtn.addEventListener("click", closeSidebar);
		
		// Handle menu click transitions
		document.querySelectorAll(".menu-link").forEach(link => {
		    link.addEventListener("click", function(event) {
		        event.preventDefault();
		        const targetPage = this.getAttribute("href");

		        document.querySelectorAll(".menu-link").forEach((item, index) => {
		            item.style.transform = "scaleY(0)";
		            item.style.opacity = "0";
		            item.style.transitionDelay = `${index * 0.2}s`;
		        });

		        setTimeout(() => {
		            sidebar.classList.remove("open");

		            setTimeout(() => {
		                window.location.href = targetPage;
		            }, 500);
		        }, 800);
		    });
		});

        //logic to calculate the width of the sidebar dynamically for all screen sizes

        function adjustSidebarWidth() {
            let tickerWidth = document.querySelector(".Header-ticker")?.offsetWidth || 100;
            let sidebar = document.querySelector(".sidebar");
            console.log(sidebar); // Check if the sidebar element is correctly targeted
        
        
            if (sidebar) {
                let sidebarWidth = `calc(100vw - ${tickerWidth}px)`;
                sidebar.style.width = sidebarWidth;
                document.querySelectorAll(".menu-item").forEach(item => {
                    item.style.width = sidebarWidth;
                });
            }
        }

        // Run function on page load and window resize
        menuBtn.addEventListener("click", adjustSidebarWidth);

        //window.addEventListener("resize", adjustSidebarWidth);
        //window.addEventListener("load", adjustSidebarWidth);
	
    })
    .catch(error => {
        console.error('Error loading sidebar:', error);
    });


