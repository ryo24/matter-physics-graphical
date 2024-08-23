// エンジンとワールドを作成
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Runner = Matter.Runner;

// エンジンを作成
const engine = Engine.create();
const { world } = engine;

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

// レンダラーを実行
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);


// マウスの作成
const mouse = Mouse.create(render.canvas);

// マウス制約の作成
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
// マウス制約をワールドに追加
World.add(world, mouseConstraint);

// レンダラーにマウスを設定
render.mouse = mouse;


// 地面の作成
const ground = Bodies.rectangle(400, 590, 810, 60, { 
    isStatic: true,
    render: {
        fillStyle: '#060a19'
    }
});

// 斜面を表す三角形の作成
const slope = Bodies.fromVertices(400, 400, [
    { x: 0, y: 0 },
    { x: 300, y: 0 },
    { x: 300, y: -150 }
], {
    friction: 0.5,
    isStatic: true,
    render: {
        fillStyle: '#f19648'
    }
});

// 図形に合わせた長方形の物体を作成
const box = Bodies.rectangle(400, 300, 60, 40, { // サイズを変更
    friction: 1,
    frictionStatic: 0.1,
    restitution: 0.1,
    density: 0.002,
    render: {
        fillStyle: '#6ab04c'
    }
});

// すべてのボディをワールドに追加
World.add(world, [ground, slope, box]);

// エンジンを実行
Engine.run(engine);

// ビューを中心に調整
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});