document.addEventListener('DOMContentLoaded', function() {
    
    // Play content function
    window.playContent = function(videoFile) {
        const modal = new bootstrap.Modal(document.getElementById('videoModal'));
        document.getElementById('modalVideo').src = '/videos/' + videoFile;
        modal.show();
    };

    // Pause modal video when closed
    document.getElementById('videoModal').addEventListener('hidden.bs.modal', function() {
        const video = document.getElementById('modalVideo');
        video.pause();
        video.currentTime = 0;
    });

    // Enable horizontal scroll with mouse wheel
    document.querySelectorAll('.scroll-x').forEach(element => {
        element.addEventListener('wheel', function(e) {
            e.preventDefault();
            this.scrollLeft += e.deltaY;
        });
    });

    // Handle video hover effects
    document.querySelectorAll('.content-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const video = this.querySelector('.content-video');
            if (video) {
                video.play();
            }
        });

        card.addEventListener('mouseleave', function() {
            const video = this.querySelector('.content-video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });

});