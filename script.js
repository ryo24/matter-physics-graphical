// エンジンとワールドを作成
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Runner = Matter.Runner,
      Constraint = Matter.Constraint,
      Events = Matter.Events;

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


// 正方形と2本のバネ接続（正方形の表面と空間点の接続）【⑥】
const boundSquare = Bodies.rectangle(400, 150, 100, 100,{
    render: {
        fillStyle: '#6ab04c'
    }
});

const constraint2Left = Constraint.create({
    pointA: { x: 50, y: 100 },
    bodyB: boundSquare,
    pointB: { x: -50, y: 0 },
    stiffness: 0.01
  });
const constraint2Right = Constraint.create({
    pointA: { x: 750, y: 100 },
    bodyB: boundSquare,
    pointB: { x: 50, y: 0 },
    stiffness: 0.01
});
World.add(world, [boundSquare, constraint2Left, constraint2Right]);


// エンジンを実行
Engine.run(engine);

// ビューを中心に調整
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});



// mousemoveイベントを設定してマウスの座標、ドラッグ対象を表示する【④】
Events.on(mouseConstraint, 'mousemove', e => {
    $('p.coordinate').text(`X: ${e.mouse.position.x} Y: ${e.mouse.position.y}`);
    const label = mouseConstraint.body ? mouseConstraint.body.label : '';
    $('p.target').text(`Dragging ${label}`);
  });