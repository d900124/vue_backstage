<template>
    <div class="container">
        <div class="sidebar">
            <div class="logo">
                <!--<img src="path/to/kajarta-logo.png" alt="KaJarta Logo">-->
            </div>
            <div class="slogan">
                <h2>Drive the Future,<br>Embrace the Journey</h2>
                <p>駕馭未來，擁抱旅程</p>
            </div>
            <nav>
                <ul>
                    <li><a href="#" class="active">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Shop</a></li>
                    <li><a href="#">Estimate</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Log in</a></li>
                </ul>
            </nav>
        </div>
        <div class="main-content">
            <img src="../assets/insax01.jpg" alt="Off-road vehicle" class="main-image">
            <div class="image-overlay">
                <div class="dots">
                    <span class="dot active"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
}
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
}

.sidebar {
    width: 250px;
    background-color: #f8f8f8;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.logo img {
    width: 50px;
    margin-bottom: 30px;
}

.slogan {
    margin-bottom: 30px;
}

.slogan h2 {
    color: #b22222;
    font-size: 24px;
    margin-bottom: 10px;
}

.slogan p {
    color: #666;
    font-size: 14px;
}

nav ul {
    list-style-type: none;
    padding: 0;
}

nav ul li {
    margin-bottom: 15px;
}

nav ul li a {
    text-decoration: none;
    color: #333;
    font-size: 16px;
}

nav ul li a.active {
    color: #b22222;
    font-weight: bold;
}

.main-content {
    flex-grow: 1;
    position: relative;
    overflow: hidden;
}

.main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-overlay {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
}

.dots {
    display: flex;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 5px;
    opacity: 0.6;
}

.dot.active {
    opacity: 1;
}
</style>