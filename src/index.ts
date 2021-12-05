/**
 * C# Exposed class
 */
interface File {

}

/**
 * C# Exposed class
 */
interface Process {

}

/**
 * C# Exposed class
 */
interface MessageBox {

}

/**
 * C# Exposed class
 */
interface MessageBoxButton {

}

/**
 * C# Exposed class
 */
interface MessageBoxImage {

}

/**
 * C# Exposed class
 */
interface MessageBoxResult {

}

/**
 * C# Exposed class
 */
interface WinPrompt {

}

enum InputType {
    Text,
    Password
}

enum L2ZoneType {
	ALTEREDZONE = 8,
    SIEGEWARZONE1 = 10,
    SIEGEWARZONE2 = 11,
    PEACEZONE = 12,
    SEVENSIGNSZONE = 13,
    PVPZONE = 14,
    GENERALZONE = 0xF
}

enum L2BodyPart {
	NONE = 0,
    UNDERWEAR = 1,
    R_EAR = 2,
    L_EAR = 4,
    LR_EAR = 6,
    NECK = 8,
    R_FINGER = 0x10,
    L_FINGER = 0x20,
    LR_FINGER = 48,
    HEAD = 0x40,
    R_HAND = 0x80,
    L_HAND = 0x100,
    GLOVES = 0x200,
    CHEST = 0x400,
    LEGS = 0x800,
    FEET = 0x1000,
    BACK = 0x2000,
    LR_HAND = 0x4000,
    FULL_ARMOR = 0x8000,
    HAIR = 0x10000,
    ALLDRESS = 0x20000,
    HAIR2 = 0x40000,
    HAIRALL = 0x80000,
    R_BRACELET = 0x100000,
    L_BRACELET = 0x200000,
    DECO = 0x400000,
    BELT = 0x10000000,
    MULTI_ALLWEAPON = 16512
}

enum L2Shots {
    // [Description("SoulShot: No-Grade")]
	SSNG = 1835,
    // [Description("SoulShot: D-Grade")]
	SSD = 1463,
    // [Description("SoulShot: C-Grade")]
	SSC = 1464,
    // [Description("SoulShot: B-Grade")]
	SSB = 1465,
    // [Description("SoulShot: A-Grade")]
	SSA = 1466,
    // [Description("SoulShot: S-Grade")]
	SSS = 1467,
    // [Description("Blessed SpiritShot - No-Grade")]
	BSSNG = 3947,
    // [Description("Blessed SpiritShot - D-Grade")]
	BSSD = 3948,
    // [Description("Blessed SpiritShot - C-Grade")]
	BSSC = 3949,
    // [Description("Blessed SpiritShot - B-Grade")]
	BSSB = 3950,
    // [Description("Blessed SpiritShot - A-Grade")]
	BSSA = 3951,
    // [Description("Blessed SpiritShot - S-Grade")]
	BSSS = 3952,
    // [Description("SoulShot: No-Grade for Beginners")]
	SSNGB = 5789
}

enum L2BeastShots {
    // [Description("Beast Shoulshot")]
	SS = 6645,
    // [Description("Beast Spiritshot")]
    SPS,
    // [Description("Blessed Beast Spiritshot")]
    BSPS
}

interface L2Element {

}

interface L2ItemType {

}

interface Vector {

}

interface Point {

}

interface L2Character extends L2Creature {

}

interface L2User extends L2Creature {

}

interface L2Creature {

}

interface L2Skill {

}

interface L2Item {

}

interface L2Buff {

}

interface L2Macro {

}

interface L2PartyMember {

}

interface L2PartyPet {

}

interface L2EntityCollection<T> extends ArrayLike<T> {
    readonly Length: number;

    GetItemByObjectID(objId: number): T|null;
    GetItemByID(id: number): T | null;
    GetItemByName(name: string): T | null;

    ContainsObjectID(objId: number): boolean;
    ContainsID(id: number): boolean;
    ContainsName(name: string): boolean;

    forEach(iterator: (item: T, index: number, self: this) => void): void;
}

interface L2PartyPetCollection extends L2EntityCollection<L2PartyPet> {

}

interface IContext {
    readonly CurrentZone: L2ZoneType;

    readonly FollowChar: L2Character;

    readonly IsAttacking: boolean;

    readonly IsConnected: boolean;

    readonly IsEnabled: boolean;

    readonly IsFollowMaster: boolean;

    readonly IsFollowModeOn: boolean;

    readonly IsInCombat: boolean;

    readonly IsInParty: boolean;

    readonly IsPartyLeader: boolean;

    readonly IsSitting: boolean;

    readonly Me: L2User;

    readonly Target: L2Creature;

    readonly BuffList: L2EntityCollection<L2Buff>;

    readonly CreatureList: L2EntityCollection<L2Creature>;

    readonly Inventory: L2EntityCollection<L2Item>;
    readonly DropList: L2EntityCollection<L2Item>;
    readonly MacroList: L2EntityCollection<L2Macro>;
    readonly PartyList: L2EntityCollection<L2PartyMember>;
    readonly PetList: L2PartyPetCollection;
    readonly SkillList: L2EntityCollection<L2Skill>;

    Alert(message: string): void;

    Attack(objectId: number): void;

    Confirm(title: string, message: string): void;

    DisableBot(): void;

    EnableBot(): void;

    Prompt(title: string, message: string, question: string): string;

    RunCommand(command: string): void;

    Select(name: string, range: number): L2Creature;

    SetCombatRect(x1: number, y1: number, x2: number, y2: number): void;

    SetWindowTitle(title: string): void;

    ShowBaloonTip(title: string, message: string, timeout: number): void;

    StartCombat(): void;

    StopCombat(): void;
}

declare const Context: IContext;

/**
 * Current version of running program.
 * eg: `2.3.0`
 */
declare const __VERSION: string;

/**
 * Filepath of current script.
 */
declare const __FILE__: string;

/**
 * Interface to interact with the server on the network level.
 * This interface does directly send packets to the server, in many cases it does
 * not verify the existence of objectId or if client is able to send such packet.
 * 
 * This might expose you to various bot detection techniques, and should be used
 * very carefully.
 * 
 * Also all the functions here are asynchonous, meaning that the result of the request
 * cannot be determined from the return type.
 * 
 * **Example**
 * ```typescript
 * Send.Attack(objId);
 * 
 * // this will print false, if the attack was not successfull right away
 * // eg. when char was disabled, target was not in attack range
 * // or simply just because of network latency
 * console.log(Me.IsAttacking);
 * ```
 */
interface SendToServer {
    Action(objectId: number): void;
    AttackRequest(objectId: number): void;
    Logout(): void;
    MoveTo(x: number, y: number): void;
    ReqBypassToServer(bypass: string): void;
    RequestActionUse(objectId: number): void;

    /**
     * Request to enable/disable automatic use of shots.
     * 
     * **NOTE:** This function **does not ensure** that automatic use of shots was enabled/disabled.
     * @param shotId 
     * @param action `0` for disable, `1` for enable
     */
    RequestAutoSoulShot(shotId: number, action: 0|1): void;
    RequestItemList(): void;
    RequestJoinParty(characterName: string): void;
    RequestMagicSkillUse(skillId: number): void;
    RequestQuickSendPost(itemId: number, recipient: string, quantity: number, send: boolean): void;
    RequestSkillList(): void;
    RequestTargetCancel(): void;
    Say2(channelType: number, target: string, message: string, unk1: boolean): void;
    SendHex(data: string): void;
    StopMove(): void;
    UseItem(objectId: number): void;
}

/**
 * Instance of SendToServer class provided to the script engine.
 * 
 * ```typescript
 * Send.StopMove();
 * Send.RequestItemList();
 * ```
 */
declare const Send: SendToServer;

interface DebugConsole {
    debug(): void;
    error(): void;
    info(): void;
    log(): void;
    warn(): void;
}

declare const Attack: IContext["Attack"];

declare const BuffsList: IContext["BuffList"];

declare const CreaturesList: IContext["CreatureList"];

declare const CurrentZone: IContext["CurrentZone"];

declare const DisableBot: IContext["DisableBot"];

declare const DropList: IContext["DropList"];

declare const EnableBot: IContext["EnableBot"];

declare const FollowChar: IContext["FollowChar"];

declare const Inventory: IContext["Inventory"];

declare const IsAttacking: IContext["IsAttacking"];

declare const IsConnected: IContext["IsConnected"];

declare const IsEnabled: IContext["IsEnabled"];

declare const IsFollowMaster: IContext["IsFollowMaster"];

declare const IsFollowModeOn: IContext["IsFollowModeOn"];

declare const IsInCombat: IContext["IsInCombat"];

declare const IsInParty: IContext["IsInParty"];

declare const IsPartyLeader: IContext["IsPartyLeader"];

declare const IsSitting: IContext["IsSitting"];

declare const MacroList: IContext["MacroList"];

declare const Me: IContext["Me"];

declare const PartyList: IContext["PartyList"];

declare const PetList: IContext["PetList"];

declare const RunCommand: IContext["RunCommand"];

declare const Select: IContext["Select"];

declare const SetCombatRect: IContext["SetCombatRect"];

declare const SetWindowTitle: IContext["SetWindowTitle"];

declare const ShowBaloonTip: IContext["ShowBaloonTip"];

declare const SkillsList: IContext["SkillList"];

declare const StartCombat: IContext["StartCombat"];

declare const StopCombat: IContext["StopCombat"];

declare const Target: IContext["Target"];

declare function Say(text: any): ReturnType<SendToServer["Say2"]>;

declare function SayToAlly(text: any): ReturnType<SendToServer["Say2"]>;

declare function SayToClan(text: any): ReturnType<SendToServer["Say2"]>;

declare function SayToParty(text: any): ReturnType<SendToServer["Say2"]>;

declare function SayToTrade(text: any): ReturnType<SendToServer["Say2"]>;

declare function Shout(text: any): ReturnType<SendToServer["Say2"]>;

declare function Tell(text: any, target: any): ReturnType<SendToServer["Say2"]>;

declare function alert(msg: any): void;

/**
 * 
 * @param ver min version number eg: `2.1.1`
 * @throws When min version requirement for script is not met.
 */
declare function assert_min_version(ver: any): void;

declare function clearInterval(id: any): void;

declare function clearTimeout(id: any): void;

declare function confirm(msg: any, title: any): any;

declare function prompt(question: any, defaultValue: any, title: any): any;

declare function setInterval(callback: any, ms: any): any;

declare function setTimeout(callback: any, ms: any): any;

/**
 * Sets a timer for specified amount of miliseconds and resolves the promise when timeout is reached.
 * 
 * ```typescript
 * console.log('start');
 * await sleep(500);
 * console.log('after 500ms');
 * ```
 * @param ms Amount of miliseconds to sleep for.
 */
declare function sleep(ms: number): Promise<void>;

/**
 * Dispatcher for events, can be overriden to use different way of triggering events.
 * 
 * When changed all On* methods will stop working.
 */
declare let __invoke: (eventName: string, args: unknown[]) => void;

interface console {
    bin(...args: any[]): void;

    debug(...args: any[]): void;

    error(...args: any[]): void;

    info(...args: any[]): void;

    log(...args: any[]): void;

    trace(...args: any[]): void;

    warn(...args: any[]): void;
}

/**
 * @event
 */
let OnLogin: () => void;
/**
 * @event
 */
let OnLogout: () => void;
/**
 * @event
 */
let OnAttack: (attackerObjId: number, objId: number, isAOE: boolean) => void;
/**
 * @event
 */
let OnAutoAttackStart: (objId: number) => void;
/**
 * @event
 */
let OnAutoAttackStop: (objId: number) => void;
/**
 * @event
 */
let OnNpcHtmlMessage: (html: string) => void;
/**
 * @event
 */
let OnDie: (objId: number) => void;
/**
 * @event
 */
let OnRevive: (objId: number) => void;
/**
 * @event
 */
let OnSpawnItem: (objId: number) => void;
/**
 * @event
 */
let OnDeleteObject: (objId: number) => void;
/**
 * @event
 */
let OnDropItem: (objId: number) => void;
/**
 * @event
 */
let OnGetItem: (itemId: number) => void;
/**
 * @event
 */
let OnTeleportToLocation: (objId: number, X: number, Y: number, Z: number) => void;
/**
 * @event
 */
let OnTargetSelected: (objId: number, targetObjId: number) => void;
/**
 * @event
 */
let OnTargetUnselected: (targetObjId: number) => void;
/**
 * @event
 */
let OnMyTargetSelected: (objId: number) => void;
/**
 * @event
 */
let OnMove: (num: number, X: number, Y: number, Z: number, dX: number, dY: number, dZ: number) => void;
/**
 * @event
 */
let OnStopMove: (num: number, X: number, Y: number, Z: number) => void;
/**
 * @event
 */
let OnChangeMoveType: (objId: number, moveType: number) => void;
/**
 * @event
 */
let OnChangeWaitType: (objId: number, waitType: number) => void;
/**
 * @event
 */
let OnSkillList: (skillList: L2EntityCollection<L2Skill>) => void;
/**
 * @event
 */
let OnMagicSkillUse: (objId: number, targetId: number, skillId: number) => void;
/**
 * @event
 */
let OnInventoryUpdate: () => void;
/**
 * @event
 */
let OnInventoryItemUpdate: (action: number, objId: number) => void;
/**
 * @event
 */
let OnIncomingPacket: (packet: number[]) => void;
/**
 * @event
 */
let OnSystemMessage: (id: number) => void;
/**
 * @event
 */
let OnNpcSay: (msgId: number, msg: string) => void;
/**
 * @event
 */
let OnSay: (charName: string, text: string, messageType: number) => void;
/**
 * @event
 */
let OnPointsEnded: () => void;
/**
 * @event
 */
let OnPointsStarted: () => void;
/**
 * @event
 */
let OnPointsStopped: () => void;
/**
 * @event
 */
let OnPointsNext: (X: number, Y: number, Z: number) => void;
/**
 * @event
 */
let OnWareHouseDepositList: (itemsList: L2EntityCollection<L2Item>) => void;
/**
 * @event
 */
let OnWareHouseWithdrawalList: (itemsList: L2EntityCollection<L2Item>) => void;
/**
 * @event
 */
let OnShopList: (shopId: number, itemsList: L2EntityCollection<L2Item>) => void;
/**
 * @event
 */
let OnTrade: (traderObjId: number, itemsList: L2EntityCollection<L2Item>) => void;
