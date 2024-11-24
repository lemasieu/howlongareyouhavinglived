let intervalId; // Biến để lưu interval

function calculateAge() {
    const dobDateInput = document.getElementById("dob-date").value;
    const dobTimeInput = document.getElementById("dob-time").value;

    if (!dobDateInput) {
        alert("Vui lòng chọn ngày hợp lệ!");
        return;
    }

    // Xử lý ngày giờ sinh
    const dobDate = new Date(dobDateInput);
    if (dobTimeInput) {
        const [hours, minutes] = dobTimeInput.split(":").map(Number);
        dobDate.setHours(hours || 0);
        dobDate.setMinutes(minutes || 0);
        dobDate.setSeconds(0);
    }

    // Xóa bất kỳ interval nào trước đó
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
        const now = new Date();

        if (dobDate > now) {
            alert("Ngày sinh không thể là ngày trong tương lai!");
            clearInterval(intervalId);
            return;
        }

        // Tính toán chi tiết
        let years = now.getFullYear() - dobDate.getFullYear();
        let months = now.getMonth() - dobDate.getMonth();
        let days = now.getDate() - dobDate.getDate();
        let hours = now.getHours() - dobDate.getHours();
        let minutes = now.getMinutes() - dobDate.getMinutes();
        let seconds = now.getSeconds() - dobDate.getSeconds();

        // Điều chỉnh khi các giá trị âm
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }

        // Tổng cộng
        const totalYears = years;
        const totalMonths = years * 12 + months;
        const totalDays = Math.floor((now - dobDate) / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor((now - dobDate) / (1000 * 60 * 60));
        const totalMinutes = Math.floor((now - dobDate) / (1000 * 60));
        const totalSeconds = Math.floor((now - dobDate) / 1000);

        // Hiển thị kết quả
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
            <div class="output">Tuổi của bạn là: ${years} năm, ${months} tháng, ${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây</div>
            <div class="output">Tính bằng năm: ${totalYears}</div>
            <div class="output">Tính bằng tháng: ${totalMonths}</div>
            <div class="output">Tính bằng ngày: ${totalDays}</div>
            <div class="output">Tính bằng giờ: ${totalHours}</div>
            <div class="output">Tính bằng phút: ${totalMinutes}</div>
            <div class="output">Tính bằng giây: ${totalSeconds}</div>
        `;
    }, 1000); // Cập nhật mỗi giây
}
