
// Soldier
function Soldier(healthArg, strengthArg) {
  this.health = healthArg;
  this.strength = strengthArg;
}

Soldier.prototype.attack = function(){
  return this.strength;
}

Soldier.prototype.receiveDamage = function(damageArg){
  this.health -= damageArg;
}


// Viking
function Viking(nameArg, healthArg, strengthArg) {
  this.name = nameArg;
  Soldier.call(this, healthArg, strengthArg);
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function (damageArg) {
  this.health -= damageArg;
  if (this.health > 0) {
    return this.name + " has received " + damageArg + " points of damage";
  } else {
    return this.name + " has died in act of combat";
  }
};

Viking.prototype.battleCry = function () {
  return "Odin Owns You All!";
};


// Saxon
function Saxon(healthArg, strengthArg) {
  Soldier.call(this, healthArg, strengthArg);
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function (damageArg) {
  this.health -= damageArg;
  if (this.health > 0) {
    return "A Saxon has received " + damageArg + " points of damage";
  } else {
    return "A Saxon has died in combat";
  }
};


// War
function War() {
  this.vikingArmy = [];
  this.saxonArmy = [];
}

War.prototype.addViking = function (viking) {
  this.vikingArmy.push(viking);
};

War.prototype.addSaxon = function (saxon) {
  this.saxonArmy.push(saxon);
};

War.prototype.vikingAttack = function () {
  var sI = Math.floor(Math.random() * this.saxonArmy.length);
  var vI = Math.floor(Math.random() * this.vikingArmy.length);
  var saxon = this.saxonArmy[sI];
  var viking = this.vikingArmy[vI];
  var result = saxon.receiveDamage(viking.strength);
  if (saxon.health <= 0) {
    this.saxonArmy.splice(sI,1);
  }
  return result;
};

War.prototype.saxonAttack = function () {
  var sI = Math.floor(Math.random() * this.saxonArmy.length);
  var vI = Math.floor(Math.random() * this.vikingArmy.length);
  var saxon = this.saxonArmy[sI];
  var viking = this.vikingArmy[vI];
  var result = viking.receiveDamage(saxon.strength);
  if (viking.health <= 0) {
    this.vikingArmy.splice(vI,1);
  }
  return result;
};

War.prototype.showStatus = function () {
  if(this.saxonArmy.length === 0) {
    return "Vikings have won the war of the century!";
  } else if(this.vikingArmy.length === 0) {
    return "Saxons have fought for their lives and survive another day...";
  } else if (this.vikingArmy.length > 0 && this.saxonArmy.length > 0) {
    return "Vikings and Saxons are still in the thick of battle.";
  }
};
