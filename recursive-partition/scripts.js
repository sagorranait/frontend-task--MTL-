document.addEventListener('DOMContentLoaded', () => {
  const layoutContainer = document.getElementById('layout-container');

  layoutContainer.style.backgroundColor = getRandomColor();
  
  layoutContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('split-button')) {
          splitPartition(e.target.closest('.partition'), e.target.dataset.split);
      } else if (e.target.classList.contains('remove-button')) {
          removePartition(e.target.closest('.partition'));
      }
  });

  interact('.partition').resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
          move(event) {
              let { x, y } = event.target.dataset;

              x = (parseFloat(x) || 0) + event.deltaRect.left;
              y = (parseFloat(y) || 0) + event.deltaRect.top;

              const containerWidth = event.target.parentNode.offsetWidth;
              const containerHeight = event.target.parentNode.offsetHeight;

              Object.assign(event.target.style, {
                  width: `${(event.rect.width / containerWidth) * 100}%`,
                  height: `${(event.rect.height / containerHeight) * 100}%`,
                  transform: `translate(${x}px, ${y}px)`
              });

              Object.assign(event.target.dataset, { x, y });
          }
      }
  });

  function splitPartition(partition, direction) {
      const newPartition1 = document.createElement('div');
      newPartition1.className = 'partition';
      newPartition1.style.backgroundColor = partition.style.backgroundColor;

      const newPartition2 = document.createElement('div');
      newPartition2.className = 'partition';
      newPartition2.style.backgroundColor = getRandomColor();

      const controls1 = createControls();
      const controls2 = createControls();

      newPartition1.appendChild(controls1);
      newPartition2.appendChild(controls2);

      if (direction === 'v') {
          partition.style.flexDirection = 'row';
      } else if (direction === 'h') {
          partition.style.flexDirection = 'column';
      }

      partition.innerHTML = '';
      partition.appendChild(newPartition1);
      partition.appendChild(newPartition2);
  }

  function removePartition(partition) {
      if (partition.parentNode && partition.parentNode.classList.contains('partition')) {
          partition.parentNode.removeChild(partition);
      }
  }

  function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  function createControls() {
      const controls = document.createElement('div');
      controls.className = 'controls';
      controls.innerHTML = `
          <button class="split-button" data-split="v">V</button>
          <button class="split-button" data-split="h">H</button>
          <button class="remove-button">-</button>
      `;
      return controls;
  }
});
