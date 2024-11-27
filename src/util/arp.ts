import { LatLngTuple } from "leaflet";

interface RouteResponse {
  destinations: {
    latitude: number;
    longitude: number;
  }[];
}

export const requestARP = async (start: LatLngTuple, end: LatLngTuple) : Promise<LatLngTuple[]> => {
  try {
    const uri = `/arpapi` + 
      `?start_latitude=${start[0]}` +
      `&start_longitude=${start[1]}` +
      `&end_latitude=${end[0]}` +
      `&end_longitude=${end[1]}`;

    console.log("send request to " + uri);
    
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    let data: RouteResponse;
    if (!response.ok) {
      console.log(response)
      // throw new Error('Route calculation failed');
      var sample = `{"destinations":[{"latitude":127.8279296875,"longitude":34.9443359375},{"latitude":127.8298828125,"longitude":34.9443359375},{"latitude":127.83037109375,"longitude":34.94580078125},{"latitude":127.8318359375,"longitude":34.9462890625},{"latitude":127.83330078125,"longitude":34.94677734375},{"latitude":127.83427734375,"longitude":34.94677734375},{"latitude":127.8357421875,"longitude":34.9462890625},{"latitude":127.83720703125,"longitude":34.94580078125},{"latitude":127.83818359375,"longitude":34.94580078125},{"latitude":127.83916015625,"longitude":34.94580078125},{"latitude":127.8396484375,"longitude":34.9443359375},{"latitude":127.84453125,"longitude":34.94140625},{"latitude":127.8494140625,"longitude":34.9423828125},{"latitude":127.85087890625,"longitude":34.94287109375},{"latitude":127.85185546875,"longitude":34.94287109375},{"latitude":127.854296875,"longitude":34.943359375},{"latitude":127.858203125,"longitude":34.943359375},{"latitude":127.862109375,"longitude":34.943359375},{"latitude":127.86455078125,"longitude":34.94384765625},{"latitude":127.86552734375,"longitude":34.94384765625},{"latitude":127.8669921875,"longitude":34.9443359375},{"latitude":127.8689453125,"longitude":34.9443359375},{"latitude":127.87041015625,"longitude":34.94482421875},{"latitude":127.87138671875,"longitude":34.94482421875},{"latitude":127.8728515625,"longitude":34.9443359375},{"latitude":127.87431640625,"longitude":34.94482421875},{"latitude":127.874560546875,"longitude":34.945556640625},{"latitude":127.875048828125,"longitude":34.945556640625},{"latitude":127.875537109375,"longitude":34.945556640625},{"latitude":127.87626953125,"longitude":34.94580078125},{"latitude":127.87724609375,"longitude":34.94580078125},{"latitude":127.8787109375,"longitude":34.9462890625},{"latitude":127.8806640625,"longitude":34.9462890625},{"latitude":127.88212890625,"longitude":34.94677734375},{"latitude":127.88310546875,"longitude":34.94677734375},{"latitude":127.88408203125,"longitude":34.94677734375},{"latitude":127.88505859375,"longitude":34.94677734375},{"latitude":127.88603515625,"longitude":34.94677734375},{"latitude":127.886767578125,"longitude":34.947021484375},{"latitude":127.887255859375,"longitude":34.947021484375},{"latitude":127.887744140625,"longitude":34.947021484375},{"latitude":127.8884765625,"longitude":34.9482421875},{"latitude":127.88994140625,"longitude":34.94873046875},{"latitude":127.89091796875,"longitude":34.94873046875},{"latitude":127.89189453125,"longitude":34.94873046875},{"latitude":127.89287109375,"longitude":34.94873046875},{"latitude":127.89384765625,"longitude":34.94873046875},{"latitude":127.89482421875,"longitude":34.94873046875},{"latitude":127.89580078125,"longitude":34.94873046875},{"latitude":127.89677734375,"longitude":34.94873046875},{"latitude":127.8982421875,"longitude":34.9482421875},{"latitude":127.901171875,"longitude":34.947265625},{"latitude":127.90703125,"longitude":34.94921875},{"latitude":127.91484375,"longitude":34.94921875},{"latitude":127.9197265625,"longitude":34.9482421875},{"latitude":127.9216796875,"longitude":34.9482421875},{"latitude":127.9236328125,"longitude":34.9482421875},{"latitude":127.9255859375,"longitude":34.9482421875},{"latitude":127.93046875,"longitude":34.94921875},{"latitude":127.9421875,"longitude":34.9453125},{"latitude":127.951953125,"longitude":34.939453125},{"latitude":127.95439453125,"longitude":34.93798828125},{"latitude":127.9548828125,"longitude":34.9365234375},{"latitude":127.95634765625,"longitude":34.93603515625},{"latitude":127.95732421875,"longitude":34.93603515625},{"latitude":127.96171875,"longitude":34.93359375},{"latitude":127.9734375,"longitude":34.9296875},{"latitude":127.9890625,"longitude":34.9296875},{"latitude":128.00078124999999,"longitude":34.93359375},{"latitude":128.00859374999999,"longitude":34.93359375},{"latitude":128.01640624999999,"longitude":34.93359375},{"latitude":128.02128906249999,"longitude":34.9326171875},{"latitude":128.02324218749999,"longitude":34.9326171875},{"latitude":128.02470703124999,"longitude":34.93310546875},{"latitude":128.02568359374999,"longitude":34.93310546875},{"latitude":128.02714843749999,"longitude":34.9326171875},{"latitude":128.02861328124999,"longitude":34.93212890625},{"latitude":128.02958984374999,"longitude":34.93212890625},{"latitude":128.02958984374999,"longitude":34.93115234375},{"latitude":128.03032226562499,"longitude":34.930908203125},{"latitude":128.03081054687499,"longitude":34.930908203125},{"latitude":128.03081054687499,"longitude":34.930419921875},{"latitude":128.03154296874999,"longitude":34.93017578125},{"latitude":128.03251953124999,"longitude":34.93017578125},{"latitude":128.03276367187499,"longitude":34.929443359375},{"latitude":128.03349609374999,"longitude":34.92919921875},{"latitude":128.03447265624999,"longitude":34.92919921875},{"latitude":128.03544921874999,"longitude":34.92919921875},{"latitude":128.03642578124999,"longitude":34.92919921875},{"latitude":128.03740234374999,"longitude":34.92919921875},{"latitude":128.03886718749999,"longitude":34.9287109375},{"latitude":128.04082031249999,"longitude":34.9287109375},{"latitude":128.04228515624999,"longitude":34.92919921875},{"latitude":128.04326171874999,"longitude":34.92919921875},{"latitude":128.04423828124999,"longitude":34.92919921875},{"latitude":128.04521484374999,"longitude":34.92919921875},{"latitude":128.04619140624999,"longitude":34.92919921875},{"latitude":128.04716796874999,"longitude":34.92919921875},{"latitude":128.04814453124999,"longitude":34.92919921875},{"latitude":128.04912109374999,"longitude":34.92919921875},{"latitude":128.04936523437499,"longitude":34.928466796875},{"latitude":128.05009765624999,"longitude":34.92822265625},{"latitude":128.05034179687499,"longitude":34.927490234375},{"latitude":128.05107421874999,"longitude":34.92724609375},{"latitude":128.05107421874999,"longitude":34.92626953125},{"latitude":128.05107421874999,"longitude":34.92529296875},{"latitude":128.05351562499999,"longitude":34.923828125},{"latitude":128.05595703124999,"longitude":34.92236328125},{"latitude":128.05644531249999,"longitude":34.9208984375},{"latitude":128.05791015624999,"longitude":34.92041015625},{"latitude":128.05888671874999,"longitude":34.92041015625},{"latitude":128.06328124999999,"longitude":34.91796875},{"latitude":128.06914062499999,"longitude":34.916015625},{"latitude":128.07158203124999,"longitude":34.91455078125},{"latitude":128.07231445312499,"longitude":34.914306640625},{"latitude":128.07280273437499,"longitude":34.914306640625},{"latitude":128.07329101562499,"longitude":34.914306640625},{"latitude":128.07353515624999,"longitude":34.91357421875},{"latitude":128.07426757812499,"longitude":34.913330078125},{"latitude":128.07475585937499,"longitude":34.913330078125},{"latitude":128.07597656249999,"longitude":34.9130859375},{"latitude":128.07792968749999,"longitude":34.9130859375},{"latitude":128.08085937499999,"longitude":34.912109375},{"latitude":128.08476562499999,"longitude":34.912109375},{"latitude":128.08647460937499,"longitude":34.909912109375},{"latitude":128.08867187499999,"longitude":34.908203125},{"latitude":128.08867187499999,"longitude":34.904296875},{"latitude":128.09453124999999,"longitude":34.90234375},{"latitude":128.09941406249999,"longitude":34.8994140625},{"latitude":128.10234374999999,"longitude":34.89453125},{"latitude":128.11015624999999,"longitude":34.89453125},{"latitude":128.11601562499999,"longitude":34.892578125},{"latitude":128.11992187499999,"longitude":34.892578125},{"latitude":128.12382812499999,"longitude":34.892578125},{"latitude":128.12578124999999,"longitude":34.88671875},{"latitude":128.13164062499999,"longitude":34.884765625},{"latitude":128.13554687499999,"longitude":34.884765625},{"latitude":128.13945312499999,"longitude":34.884765625},{"latitude":128.14335937499999,"longitude":34.884765625},{"latitude":128.14921874999999,"longitude":34.88671875},{"latitude":128.16093749999999,"longitude":34.8828125},{"latitude":128.17265624999999,"longitude":34.87890625},{"latitude":128.18046874999999,"longitude":34.87890625},{"latitude":128.18632812499999,"longitude":34.876953125},{"latitude":128.18828124999999,"longitude":34.87109375},{"latitude":128.19609374999999,"longitude":34.87109375},{"latitude":128.20390624999999,"longitude":34.87109375},{"latitude":128.20585937499999,"longitude":34.865234375},{"latitude":128.21171874999999,"longitude":34.86328125},{"latitude":128.21464843749999,"longitude":34.8583984375},{"latitude":128.21757812499999,"longitude":34.857421875},{"latitude":128.22148437499999,"longitude":34.857421875},{"latitude":128.22294921874999,"longitude":34.85498046875},{"latitude":128.22441406249999,"longitude":34.8544921875},{"latitude":128.22636718749999,"longitude":34.8544921875},{"latitude":128.22929687499999,"longitude":34.853515625},{"latitude":128.23076171874999,"longitude":34.85107421875},{"latitude":128.23320312499999,"longitude":34.849609375},{"latitude":128.23466796874999,"longitude":34.84716796875},{"latitude":128.23710937499999,"longitude":34.845703125},{"latitude":128.23808593749999,"longitude":34.8427734375},{"latitude":128.24101562499999,"longitude":34.841796875},{"latitude":128.24199218749999,"longitude":34.8388671875},{"latitude":128.24492187499999,"longitude":34.837890625},{"latitude":128.24589843749999,"longitude":34.8349609375},{"latitude":128.24663085937499,"longitude":34.833740234375},{"latitude":128.24711914062499,"longitude":34.833740234375},{"latitude":128.24760742187499,"longitude":34.833740234375},{"latitude":128.24833984374999,"longitude":34.83349609375},{"latitude":128.24980468749999,"longitude":34.8330078125},{"latitude":128.25029296874999,"longitude":34.83154296875},{"latitude":128.25273437499999,"longitude":34.830078125},{"latitude":128.25371093749999,"longitude":34.8271484375},{"latitude":128.25664062499999,"longitude":34.826171875},{"latitude":128.26054687499999,"longitude":34.826171875},{"latitude":128.26640624999999,"longitude":34.82421875},{"latitude":128.26933593749999,"longitude":34.8193359375},{"latitude":128.27421874999999,"longitude":34.81640625},{"latitude":128.27421874999999,"longitude":34.80859375},{"latitude":128.28593749999999,"longitude":34.8046875},{"latitude":128.30937499999999,"longitude":34.796875},{"latitude":128.33281249999999,"longitude":34.7890625},{"latitude":128.34843749999999,"longitude":34.7890625},{"latitude":128.35332031249999,"longitude":34.7802734375},{"latitude":128.35332031249999,"longitude":34.7783203125},{"latitude":128.35429687499999,"longitude":34.775390625},{"latitude":128.35673828124999,"longitude":34.77392578125},{"latitude":128.36015624999999,"longitude":34.76953125},{"latitude":128.36503906249999,"longitude":34.7685546875},{"latitude":128.36650390624999,"longitude":34.76806640625},{"latitude":128.36748046874999,"longitude":34.76806640625},{"latitude":128.36845703124999,"longitude":34.76806640625},{"latitude":128.36943359374999,"longitude":34.76806640625},{"latitude":128.37089843749999,"longitude":34.7685546875},{"latitude":128.37578124999999,"longitude":34.76953125},{"latitude":128.38017578124999,"longitude":34.76611328125},{"latitude":128.38164062499999,"longitude":34.763671875},{"latitude":128.38457031249999,"longitude":34.7626953125},{"latitude":128.38652343749999,"longitude":34.7626953125},{"latitude":128.38847656249999,"longitude":34.7626953125},{"latitude":128.38994140624999,"longitude":34.76220703125},{"latitude":128.39091796874999,"longitude":34.76220703125},{"latitude":128.39189453124999,"longitude":34.76220703125},{"latitude":128.39335937499999,"longitude":34.759765625},{"latitude":128.39726562499999,"longitude":34.759765625},{"latitude":128.40117187499999,"longitude":34.759765625},{"latitude":128.40507812499999,"longitude":34.759765625},{"latitude":128.40800781249999,"longitude":34.7587890625},{"latitude":128.40996093749999,"longitude":34.7587890625},{"latitude":128.41191406249999,"longitude":34.7587890625},{"latitude":128.41386718749999,"longitude":34.7587890625},{"latitude":128.41582031249999,"longitude":34.7587890625},{"latitude":128.41777343749999,"longitude":34.7587890625},{"latitude":128.41972656249999,"longitude":34.7587890625},{"latitude":128.42167968749999,"longitude":34.7587890625},{"latitude":128.42363281249999,"longitude":34.7587890625},{"latitude":128.42436523437499,"longitude":34.757568359375},{"latitude":128.42509765624999,"longitude":34.75732421875},{"latitude":128.42607421874999,"longitude":34.75732421875},{"latitude":128.42753906249999,"longitude":34.7568359375},{"latitude":128.42949218749999,"longitude":34.7568359375},{"latitude":128.43242187499999,"longitude":34.755859375},{"latitude":128.44218749999999,"longitude":34.7578125},{"latitude":128.45781249999999,"longitude":34.7578125},{"latitude":128.46953124999999,"longitude":34.75390625},{"latitude":128.47734374999999,"longitude":34.75390625},{"latitude":128.48320312499999,"longitude":34.751953125},{"latitude":128.48613281249999,"longitude":34.7529296875},{"latitude":128.48808593749999,"longitude":34.7529296875},{"latitude":128.49003906249999,"longitude":34.7529296875},{"latitude":128.49125976562499,"longitude":34.752685546875},{"latitude":128.49174804687499,"longitude":34.752685546875},{"latitude":128.49223632812499,"longitude":34.752685546875},{"latitude":128.49272460937499,"longitude":34.752685546875},{"latitude":128.49394531249999,"longitude":34.7529296875},{"latitude":128.49589843749999,"longitude":34.7529296875},{"latitude":128.49882812499999,"longitude":34.751953125},{"latitude":128.50273437499999,"longitude":34.751953125},{"latitude":128.50371093749999,"longitude":34.7490234375},{"latitude":128.50664062499999,"longitude":34.748046875},{"latitude":128.51054687499999,"longitude":34.748046875},{"latitude":128.51640624999999,"longitude":34.74609375},{"latitude":128.51933593749999,"longitude":34.7412109375},{"latitude":128.52226562499999,"longitude":34.740234375},{"latitude":128.52617187499999,"longitude":34.740234375},{"latitude":128.53007812499999,"longitude":34.740234375},{"latitude":128.53398437499999,"longitude":34.740234375},{"latitude":128.53984374999999,"longitude":34.73828125},{"latitude":128.54179687499999,"longitude":34.732421875},{"latitude":128.54765624999999,"longitude":34.73046875},{"latitude":128.55546874999999,"longitude":34.73046875},{"latitude":128.56718749999999,"longitude":34.7265625},{"latitude":128.57695312499999,"longitude":34.720703125},{"latitude":128.57988281249999,"longitude":34.7216796875}]}%      `;
      data = JSON.parse(sample);
    } else {
      data = await response.json();
    }

    //const data = await response.json();
    const destinations = data.destinations;

    return destinations.map((destination: { latitude: number; longitude: number }) => {
      const latitude = destination.latitude;
      const longitude = destination.longitude;
      return [latitude, longitude] as LatLngTuple;
    });
    
  } catch (error) {
    throw error;
  }
};