// エンジンとワールドを作成
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

// エンジンを作成
const engine = Engine.create();

// レンダラーを作成し、HTMLのbodyに追加
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false // ワイヤーフレーム表示をオフにする
    }
});

// 地面とボールを作成
const ground = Bodies.rectangle(400, 580, 810, 60, { isStatic: true });
const ball = Bodies.circle(400, 100, 50);

// ボディをワールドに追加
World.add(engine.world, [ground, ball]);

// エンジンを実行
Engine.run(engine);

// レンダラーを実行
Render.run(render);
