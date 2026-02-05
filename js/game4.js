body {
  margin: 0;
  font-family: 'Great Vibes', cursive;
  background: url("../images/bg1.jpg") no-repeat center/cover;
  min-height: 100vh;
  overflow-x: hidden;
  color: white;
}

.container {
  max-width: 1100px;
  margin: auto;
  padding: 40px 20px 100px;
}

h1 {
  text-align: center;
  font-size: 48px;
  margin-bottom: 30px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
}

.game-area {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  flex-wrap: wrap;
}

.left, .right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item, .slot {
  width: 360px;
  min-height: 42px;
  margin-bottom: 10px;
  border-radius: 12px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  background: rgba(255,77,109,0.9);
  cursor: grab;
}

.slot {
  background: rgba(255,255,255,0.2);
  border: 2px dashed rgba(255,255,255,0.5);
}

#checkBtn {
  display: block;
  margin: 25px auto 10px;
  padding: 8px 32px;
  font-size: 20px;
  border: none;
  border-radius: 25px;
  background: #ff4d6d;
  color: white;
  cursor: pointer;
}

#result {
  text-align: center;
  font-size: 24px;
  margin-top: 10px;
}

/* Floating hearts */
@keyframes floatHearts {
  from { transform: translateY(0) rotate(0); opacity: 1; }
  to { transform: translateY(-900px) rotate(360deg); opacity: 0; }
}

.heart {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #ff4d6d;
  bottom: -40px;
  transform: rotate(45deg);
  animation: floatHearts linear infinite;
  z-index: 0;
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  background: #ff4d6d;
  border-radius: 50%;
}

.heart::before { top: -8px; left: 0; }
.heart::after { left: 8px; top: 0; }

@media (max-width: 900px) {
  .item, .slot {
    width: 100%;
  }
}
