/**
 * Подсчёт баллов по списку
 * @param Array list
 */

const calc = (list) => {
    let result = list.childs.reduce((prev, item ) => {
        return prev + calc( item );
    }, 0);

    list.elements.forEach((item, key, list) => {
        if(item.color == 'green'){
            if(key == 0){
                result += item.weight;
            }else if(list[key - 1].color == 'blue'){
                // зелёный следует за синим
                result -= item.weight;
            }else {
                result += item.weight;
            }
        }else if(item.color == 'yellow') {
            if (key == 0) {
                result += item.weight;
            } else if (list[key - 1].color == 'yellow') {
                // жёлтый за жёлтым
                result -= item.weight;
            } else {
                result += item.weight;
            }
        }else {
            result += item.weight;
        }
    });

    return result;
};

export default (list) => {

    return calc( list );
}